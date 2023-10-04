import React, { useEffect, useState } from 'react';
import ParkCard from './ParkCard';
import '../components/ParkContainer.css';
import { NavLink } from "react-router-dom";

function ParkContainer() {

    // const [parks, setParks] = useState([]);
    const [parksWithReviews, setParksWithReviews] = useState([]);
   
     useEffect(() => {
        // fetch('/parks')
        //     .then(r => r.json())
        //     .then((data) => setParks(data))
        //     .catch((error) => console.log('Error fetching parks', error));

        fetch('/parks_with_reviews') 
            .then((response) => response.json())
            .then((data) => setParksWithReviews(data))
            .catch((error) => console.log('Error fetching parks with reviews', error));

        // fetch('/reviews')
        //     .then(r => r.json())
        //     .then((data) => setReviews(data))
        //     .catch((error) => console.log('Error fetching reviews', error));
        
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