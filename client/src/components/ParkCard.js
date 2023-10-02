import React from 'react';
import '../components/ParkCard.css'

function ParkCard({ park }) {
  const { name, location, description, reviews } = park;
  
  return (
    <div className='parkcard'>
      <div className='card-heading'>
        <h3>Name: {name}</h3>
      </div>
        {/* <img className="parkCardImage" src={image} alt='park'/> */}
        <div className='loction-region'>
          <p>Location: {location}</p>
          
        </div>
        <p id='descriptionP'>Description: {description}</p>

        <div className="reviews">
          <h4>Reviews:</h4>
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