import React from 'react';
import '../components/ParkCard.css'

function ParkCard({ park }) {
  const { name, image, location, description, reviews, user_name } = park;
  
  return (
    <div className='parkcard'>
      <div className='card-heading'>
        <h3 id='parkName'>{name}</h3>
      </div>
        <img src={image} className="parkCardImage" alt='park'/>
        <div className='location-region'>
          <p id='location'>{location}</p>
          
        </div>
        <p id='descriptionP'>{description}</p>

        <div className="reviews">
          <h4>Park Reviews:</h4>
          <ul className='reviewList'>
            {reviews.map((review) => (
              <li key={review.id}>&ldquo;{review.title}&rdquo; - <span id="reviewerName">{review.user_name}</span></li>
            ))}
          </ul>

      </div>
    </div>
  )
}

export default ParkCard