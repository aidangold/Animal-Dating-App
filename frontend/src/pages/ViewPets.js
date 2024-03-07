import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import './viewpets.css';

export default function ViewPets () {
    // fetch and store full pet data
    const [fullPetData, setFullPetData] = useState([]);
    
    useEffect(() => {
        fetch('https://animaldatingapp-backend-nzjce52oiq-ue.a.run.app/pets')
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(res);  // reject errors
            }
            return res.json();
        })
        .then((data) => {
            setFullPetData(data);
        })
        .catch((res) => {       // snippet from https://stackoverflow.com/a/67660773
            console.log(res.status, res.statusText);
            res.json().then((json) => {
                console.log(json);
            })
        });
    }, []);

    function handleEdit () {

    }

    function handleDelete (petId) {
        fetch(`https://animaldatingapp-backend-nzjce52oiq-ue.a.run.app/pets/${petId}`, {
            method: 'DELETE'
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
            alert('Pet successfully deleted.')
        })
        .catch((error) => {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        });
    }

    const petdata = fullPetData.map((pet) => (
        <tr key={pet.petID}>
            <td>
                <div className='pet-icon'>
                <img
                src={pet.petPicture}
                height={80}
                alt={pet.name}
                />
                </div>
            </td>
            <td>{pet.petID}</td>
            <td>{pet.petName}</td>
            <td>{pet.petType}</td>
            <td>{pet.petSex}</td>
            <td>{pet.petBreed}</td>
            <td>{pet.petAvailability}</td>
            <td><IconButton aria-label="delete" size="large" onClick={() => {handleEdit(pet.petID);}}>
                    <EditRoundedIcon />
                </IconButton></td>
            <td><IconButton aria-label="delete" size="large" onClick={() => {handleDelete(pet.petID);}}>
                    <DeleteRoundedIcon />
                </IconButton></td>
        </tr>
    ));

    if (petdata.length == 0) {
        return (
            <div className="no-pets">
                <p>There are no pets to display.</p>
            </div>
        )
    }

    return (
        <div className="pets-table">
            <table>
                <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Sex</th>
                    <th>Breed</th>
                    <th>Availability</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                {petdata}
            </table>
        </div>
    )
}