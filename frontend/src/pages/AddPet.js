import React, { useState } from 'react';
import './addpet.css';

// !!! Validate user is logged in and has admin role

// configure your s3 bucket values as see fit in the .env
// tutorial on how to upload file to aws s3 bucket in React:
// https://www.mohammadfaisal.dev/blog/how-to-upload-files-to-aws-s3-in-react

// https://react.dev/reference/react-dom/components/select#reading-the-select-box-value-when-submitting-a-form
export default function AddPetForm() {
    const [file, setFile] = useState();

    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    const handleSubmit = (e) => {
        // Prevent the browser from reloading the page
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        formData.append("petPicture", file);

        // Or you can get an array of name-value pairs.
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        // You can pass formData as a fetch body directly:
        fetch('https://animaldatingapp-backend-nzjce52oiq-ue.a.run.app/pets', { 
            method: form.method, 
            headers: {
                'content-type': 'multipart/form-data',
            },
            body: formData 
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.error);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            alert('Pet added!')
            navigate('/login');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        });
    }

    return (
        <div id='crud-main'>
            <h2>Add a Pet</h2>
            <form id="pet-form" method="POST" autoComplete="off" onSubmit={handleSubmit}>
                <label>Name </label>
                <input type="text" name="petName" required />
                
                <label>Weight </label>
                <input type="number" name="petWeight" required
                    onChange={(e) => e.target.value < 0 ? (e.target.value = 0) : e.target.value} />

                <label>Type </label>
                <select name="petType" defaultValue="dog">
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                </select>

                <label>Sex</label>
                <select name="petSex" defaultValue="male">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <label>Breed</label>
                <input type='text' name="petBreed" required />

                <label>Birthday </label>
                <input type='date' name="petBirthday" required />

                <fieldset>
                    <legend>Good with Animals</legend>
                    <input type="radio" id="gWAy" name="goodWithAnimals" value="true" />
                    <label htmlFor="gWAy">Yes</label>
                    <input type="radio" id="gWAn" name="goodWithAnimals" value="false" checked />
                    <label htmlFor="gWAn">No</label>
                </fieldset>
                <fieldset>
                    <legend>Good with Children</legend>
                    <input type="radio" id="gWCy" name="goodWithChildren" value="true" />
                    <label htmlFor="gWCy">Yes</label>
                    <input type="radio" id="gWCn" name="goodWithChildren" value="false" checked />
                    <label htmlFor="gWCn">No</label>
                </fieldset>
                <fieldset>
                    <legend>Must be Leashed</legend>
                    <input type="radio" id="mBLy" name="mustBeLeashed" value="true" />
                    <label htmlFor="mBLy">Yes</label>
                    <input type="radio" id="mBLn" name="mustBeLeashed" value="false" checked />
                    <label htmlFor="mBLn">No</label>
                </fieldset>

                <label>Availability</label>
                <select name="petAvailability" defaultValue="Available">
                    <option value="Available">Available</option>
                    <option value="Pending Adoption">Pending Adoption</option>
                    <option value="Adopted">Adopted</option>
                    <option value="Unavailable">Unavailable</option>
                </select>

                <label>Description</label>
                <textarea name="petDescription" required></textarea>

                <label>Upload a Photo</label>
                <br></br>
                <input type="file" accept="image/*" onChange={handleChange} required />
                <br></br>
                <input type="reset" value="Reset" /> <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}