import React, { useState } from 'react';
import { uploadFile } from 'react-s3';
import './addpet.css';
import '../config';

// !!! Validate user is logged in and has admin role

// configure your s3 bucket values as see fit in a config.js file in frontend root
// tutorial on how to upload file to aws s3 bucket in React:
// https://www.mohammadfaisal.dev/blog/how-to-upload-files-to-aws-s3-in-react
const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

// https://react.dev/reference/react-dom/components/select#reading-the-select-box-value-when-submitting-a-form
export default function AddPetForm() {
    // For uploading image to AWS S3:
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgData, setImgData] = useState([]);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        // Prevent the browser from reloading the page
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        // upload to s3 bucket
        uploadFile(selectedFile, config)
            .then((data) => {
                console.log(data);
                setImgData(data);   // save response data
            })
            .catch(err => console.error(err));

        // get img location url & append to formData
        const imgUrl = imgData.location;
        formData.append("petPicture", imgUrl);

        // You can pass formData as a fetch body directly:
        fetch('https://animaldatingapp-backend-nzjce52oiq-ue.a.run.app/pets', { method: form.method, body: formData });

        // Or you can get an array of name-value pairs.
        console.log([...formData.entries()]);
    }

    return (
        <div id='crud-main'>
            <h2>Add a Pet</h2>
            <form className="pet-form" method="POST" autoComplete="off" onSubmit={handleSubmit}>
                <label>Name </label>
                <input type="text" name="petName" />
                
                <label>Weight </label>
                <input type="number" name="petWeight" onChange={(e) => e.target.value < 0 ? (e.target.value = 0) : e.target.value} />

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
                <input type='text' name="petBreed" />

                <label>Birthday </label>
                <input type='date' name="petBirthdat" />

                <fieldset>
                    <legend>Attributes</legend>
                    <input type="checkbox" id="gWA" name="goodWithAnimals" value="true" />
                    <label for="gWA">Good with Animals</label>
                    <input type="checkbox" id="gWC" name="goodWithChildren" value="true" />
                    <label for="gWC">Good with Children</label>
                    <input type="checkbox" id="mBL" name="mustBeLeashed" value="true" />
                    <label for="mBL">Must be Leashed</label>
                </fieldset>

                <label>Availability</label>
                <select name="petAvailability" defaultValue="Available">
                    <option value="Available">Available</option>
                    <option value="Pending Adoption">Pending Adoption</option>
                    <option value="Adopted">Adopted</option>
                    <option value="Unavailable">Unavailable</option>
                </select>

                <label>Description</label>
                <textarea name="petDescription"></textarea>

                <label>Image Upload</label>
                <input type="file" onChange={handleFileInput}/>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}