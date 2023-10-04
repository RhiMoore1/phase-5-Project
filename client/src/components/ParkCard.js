import React from 'react';
import '../components/ParkCard.css'

function ParkCard({ park }) {
  const { name, image, location, description, reviews } = park;
  
  return (
    <div className='parkcard'>
      <div className='card-heading'>
        <h3>{name}</h3>
      </div>
        <img src={image} className="parkCardImage" alt='park'/>
        <div className='loction-region'>
          <p>{location}</p>
          
        </div>
        <p id='descriptionP'>{description}</p>

        <div className="reviews">
          <h4>Park Reviews:</h4>
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>{review.title}</li>
            ))}
          </ul>

      </div>
    </div>
  )
}

export default ParkCard