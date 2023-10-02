import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import '../components/ReviewsContainer.css';
import { NavLink } from "react-router-dom";

function ReviewsContainer() {

    const [reviews, setReviews] = useState([]);
     useEffect(() => {

        fetch('/reviews')
            .then(r => r.json())
            .then((data) => setReviews(data))
            .catch((error) => console.log('Error fetching reviews', error));
     }, []);
    
    return (   
        <div className='reviews'>
            <div className='reviews-list'>
                {reviews.map((review) => {
                    return (
                        <ReviewCard   
                            key={review.id}   
                            review={review}              
                        />
                    )
                })}
            </div>
        </div>
  )
}

export default ReviewsContainer