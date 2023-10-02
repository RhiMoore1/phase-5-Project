import React, { useEffect, useState } from 'react';
import ParkCard from './ParkCard';
import '../components/ParkContainer.css';
import { NavLink } from "react-router-dom";

function ParkContainer() {

    const [parks, setParks] = useState([]);
   
     useEffect(() => {
        fetch('/parks')
            .then(r => r.json())
            .then((data) => setParks(data))
            .catch((error) => console.log('Error fetching parks', error));
     }, []);
    
    return (   
        <div className='parks'>
            <div className='parks-list'>
                {parks.map((park) => {
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