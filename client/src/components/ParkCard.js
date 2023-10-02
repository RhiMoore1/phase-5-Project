import React from 'react';
import '../components/ParkCard.css'

function ParkCard({ park, reviews }) {
  const { name, location, description } = park;
  reviews = park.reviews
  
    
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
   
      </div>
    </div>
  )
}

export default ParkCard