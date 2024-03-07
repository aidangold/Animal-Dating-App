import React, { useState } from 'react';
import { uploadFile } from 'react-s3';
import './addpet.css';

export default function UploadImg () {
    // For uploading image to AWS S3:
    const config = {
        bucketName: process.env.REACT_APP_S3_BUCKET,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    }

    const [imgData, setImgData] = useState([]);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    // upload to s3 bucket
    uploadFile(selectedFile, config)
    .then((data) => {
        console.log(data);
        setImgData(data);   // save response data
    })
    .catch(err => console.error(err));

    // get img location url & append to formData
    //const imgUrl = imgData.location;
    //formData.append("petPicture", imgUrl);

    return (
        <div id="crud-main">
            <label>Image Upload</label>
            <input type="file" onChange={handleFileInput}/>
        </div>
    )
}