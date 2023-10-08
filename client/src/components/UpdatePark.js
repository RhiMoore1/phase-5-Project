import React, { useState } from 'react';
import './UpdatePark.css';
import { useHistory } from 'react-router-dom';

function UpdatePark({ onUpdatePark }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");
    const [reviewTitle, setReviewTitle] = useState(""); 
    const [searchPark, setSearchPark] = useState("");
    const [id, setId] = useState("")
    const history = useHistory()

    const handleSearchPark = (e) => {
        setSearchPark(e.target.value)
    };

    function handleUpdatePark(updatedPark) {
        onUpdatePark(updatedPark)
    }

    function handleSubmit(e) {
        e.preventDefault()

        const formData = {
            park: {
            name,
            description,
            location,
            image,
            id
        },
            review: {
                title: reviewTitle,
            },
        };
        

        fetch(`/parks/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then((r) => {

                console.log(formData)
            if (r.ok) {
              r.json().then((originalPark) => {
                // updateUser(user)
                console.log(originalPark)
                history.push('/parks')
            
              }).then((formData) => handleUpdatePark(formData));
            }
          });
    }

  return (
    <div className='form-container'>
        <form className='form' onSubmit={handleSubmit}>
            <h1>Update New Park</h1>

            <div className='search'>
                 <label htmlFor='search'>Search:</label>
                 <input
                    id='search'
                    type='text'
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder='Search parks by ID...'
                />
            </div>

            <label htmlFor="parkName">Park Name</label>
            <input
                type='text' 
                id='parkName' 
                value={name} 
                onChange={(e) => setName(e.target.value)}
            ></input>

            <label htmlFor="parkDescription">Park Description</label>
            <textarea
                type='text' 
                id='parkDescription'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <label htmlFor="parkLocation">park Location</label>
            <input
                type='text' 
                id='parkLocation' 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
            ></input>

            <label htmlFor="parkImage">Park Image</label>
            <input 
                type='img' 
                id='parkImage'
                value={image}
                onChange={(e) => setImage(e.target.value)}
            ></input>

            <label htmlFor="parkReview">Leave Review</label>
            <input 
                type='text' 
                id='parkReview'
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
            ></input>


            <input type="submit" name="updatepark" id="updatepark" value="Update Park"/>
        </form>
    </div>
  )
}

export default UpdatePark