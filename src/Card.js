import React, { useState, useEffect, useRef } from 'react'

//card component
export default function Card({ card }) {
  //handle our flipping animation + set default to false
  const [flip, setFlip] = useState(false)
  const [height, setHeight] = useState('0')
//know current front and back of the  card element
  const question_ = useRef()
  const answer_ = useRef()
//calculate the max height of container
  function MaxHeight() {
    const questionHeight = question_.current.getBoundingClientRect().height //get height of font/question element
    const answerHeight = answer_.current.getBoundingClientRect().height //get height of back/answer element
    setHeight(Math.max(questionHeight, answerHeight, 100))//get largest values
  }

  //whenever a question or answers gets longer or shorter, recalculate the height
  useEffect(MaxHeight, [card.question, card.answer, card.options])
  useEffect(() => {
    window.addEventListener('resize', MaxHeight)//everytime the window is resized call function
    return () => window.removeEventListener('resize', MaxHeight)
  }, [])

  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}//if flip is true set a class of flip otherwise class=default/blank
      style={{ height: height }}//set height equal to height variable
      onClick={() => setFlip(!flip)}//whenever the click event takes place the current flip is set = to not flip;
    >
      
      <div className="question" ref={question_}>
        {card.question}
        <div className="card-options">
          {card.options.map(option => {
            return <div className="card-option" key={option}>{option}</div>
          })}
          
        </div>
      </div>
      <div className="answer" ref={answer_}>{card.answer}</div>
    </div>
  )
}
