import React, { useState, useEffect, useRef } from 'react';
import CardList from './CardList';
import './App.css'
//import axios to make calling api easier
import axios from 'axios'

function App() {
  const [cards, setcards] = useState([])
  const [categories, setCategories] = useState([])

  const category_ = useRef()
  const amount_ = useRef()


  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')//generates all the different subjects
      .then(res => {
        setCategories(res.data.trivia_categories)//call set
      })
  }, [])

  useEffect(() => {
   
  }, [])
//get rid of jibberish characters from the html components
  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML= str
    return textArea.value//converts html to string
  }
//happens as soon as component mounts
  function handleSubmit(e) {
    e.preventDefault()//make sure code goes through this react code
    axios
    .get('https://opentdb.com/api.php', {
      params: {
        amount: amount_.current.value,
        category: category_.current.value
      }
    })
    .then(res => {
      //return array of all the flashcards
      setcards(res.data.results.map((questionItem, index) => {
        const answer = decodeString(questionItem.correct_answer)// correct answers
        const options = [
          ...questionItem.incorrect_answers.map(a => decodeString(a)),//incorrect + correct answers
          answer
        ]
        return {
          id: `${index}-${Date.now()}`,//ensures uniqueness
          question: decodeString(questionItem.question),
          answer: answer,
          options: options.sort(() => Math.random() - .5)//randomizes the options 
        }
      }))
    })
  }

  return (
    <>
    {/*create header */}
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">{/*wrap form elements */}
          <label htmlFor="category">Subject</label>
          {/*subject dropdown menu */}
          <select id="category" ref={category_}>
            {categories.map(category => {
              return <option value={category.id} key={category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          {/*Questions Counter */}
          <label htmlFor="amount">Number of Questions</label>
          <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amount_} />{/*min amount of 1 default 10 cards on screen */}
        </div>
        <div className="form-group">
          {/*Generate Button*/}
          <button className="btn">Generate</button>
        </div>
      </form>
          <div className="container">{/* page formatting */}
        <CardList cards={cards} />
      </div>
    </>
  );
}

export default App;
