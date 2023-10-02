import React from 'react';
import '../components/ReviewCard.css'

function ReviewCard({ review, park }) {

  const { title } = review;
  
  return (
    <div className='reviewCard'>
      <div className='card-heading'>
        <h3>Review: {title}</h3>
        
      </div>
    </div>
  )
}

export default ReviewCard