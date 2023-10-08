import React, { useEffect, useState } from 'react';
import ParkCard from './ParkCard';
import '../components/ParkContainer.css';
import { NavLink } from "react-router-dom";

function ParkContainer() {

    const [parksWithReviews, setParksWithReviews] = useState([]);
   
     useEffect(() => {

        fetch('/parks_with_reviews') 
            .then((response) => response.json())
            .then((data) => setParksWithReviews(data))
            .catch((error) => console.log('Error fetching parks with reviews', error));
        
     }, []);
    
    return (   
        <div className='parks'>
            <div className='parks-list'>
                {parksWithReviews.map((park) => {
                    return (
                        <ParkCard 
                            key={park.id} 
                            park={park}
                            
                        />
                    )
                })}
            </div>
        </div>
  )
}

export default ParkContainer