import React from 'react';
import '../components/ReviewCard.css'

function ReviewCard({ review }) {

  const { title, park_id, user_id } = review;
 
  
  return (
    <div className='reviewCard'>
      <div className='card-heading'>
        <h3>Review: {title}</h3>
        <h4>Park Id: {park_id}</h4>
        <h4>User Id: {user_id}</h4>
        
      </div>
    </div>
  )
}

export default ReviewCard