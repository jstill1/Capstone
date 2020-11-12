import React from 'react';
import Card from './Card';

export default function CardList({ cards }) {
  return (
    //grid styling so that the app can be responsive no matter the screen size
    <div className="my-grid">
      {cards.map(card => {
        //return card component only re renders unique elements
        return <Card card={card} key={card.id} />
      })}
    </div>
  )
}

