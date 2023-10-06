import React, { useState } from 'react';
import './AddNew.css';
import { useHistory } from 'react-router-dom';

function AddNew({ Addpark }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");
    const [reviewTitle, setReviewTitle] = useState(""); 
    const history = useHistory()


    function handleSubmit(e) {
        e.preventDefault()

        const formData = {
            park: {
            name,
            description,
            location,
            image
        },
            review: {
                title: reviewTitle,
            },
        };

        fetch('/parks/new', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then((r) => {
            if (r.ok) {
              r.json().then((user) => {
                // updateUser(user)
                // console.log(user)
                history.push('/parks')
                
              });
            }
          });
    }

  return (
    <div className='form-container'>
        <form className='form' onSubmit={handleSubmit}>
            <h1>Add New Park</h1>

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


            <input type="submit" name="addpark" id="addpark" value="Add park"/>
        </form>
    </div>
  )
}

export default AddNew
