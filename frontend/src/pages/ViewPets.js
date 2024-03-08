import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import './viewpets.css';

export default function ViewPets() {
  // fetch and store full pet data
  const [fullPetData, setFullPetData] = useState([]);
  const [editedPetId, setEditedPetId] = useState(null);
  const [editedPetData, setEditedPetData] = useState({});
  const [file, setFile] = useState();

  useEffect(() => {
    fetchPetData();
  }, []);

  function fetchPetData() {
    // fetch('http://localhost:5000/pets')
    fetch('https://animaldatingapp-backend-nzjce52oiq-ue.a.run.app/pets')
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res); // reject errors
        }
        return res.json();
      })
      .then((data) => {
        setFullPetData(data);
      })
      .catch((res) => {
        // snippet from https://stackoverflow.com/a/67660773
        console.log(res.status, res.statusText);
        res.json().then((json) => {
          console.log(json);
        });
      });
  }

  function handleEdit(petId) {
    const editedPet = fullPetData.find((pet) => pet.petID === petId);
    setEditedPetId(petId);
    setEditedPetData(editedPet);
  }

  function handleChange(event, key) {
    const { value } = event.target;
    setEditedPetData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  }

  function handleSave(petId) {
    const formData = new FormData();

    for (const key in editedPetData) {
      if (key === 'petPicture') {
        continue;
      }
      formData.append(key, editedPetData[key]);
    }

    // Updates petPicture if a file is uploaded
    if (file) {
      formData.append('petPicture', file);
    } else {
      formData.append('petPicture', editedPetData['petPicture']);
    }

    console.log('Updating pet with ID:', petId);
    console.log('formData:', formData);

    // Send the PUT request with the updated pet data
    fetch(
      //   `http://localhost:5000/pets/${petId}`,
      `https://animaldatingapp-backend-nzjce52oiq-ue.a.run.app/pets/${petId}`,
      {
        method: 'PUT',
        headers: {
          //   'Content-Type': 'application/json',
        },
        // body: JSON.stringify(updatedPetSnakeCase),
        body: formData,
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update pet data: ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        alert('Pet data successfully updated.');
        // Refresh pet data after successful update
        fetchPetData();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
      });
  }

  function handleDelete(petId) {
    fetch(
      `https://animaldatingapp-backend-nzjce52oiq-ue.a.run.app/pets/${petId}`,
      {
        method: 'DELETE',
      }
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.error);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        alert('Pet successfully deleted.');
        // added automatic refreshing here
        fetchPetData();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
      });
  }

  function handlePhotoChange(event, petId) {
    setFile(event.target.files[0]);
    // const reader = new FileReader();
    // reader.onload = function (e) {
    //   const newPetData = {
    //     ...editedPetData,
    //     petPicture: e.target.result,
    //   };
    //   setEditedPetData(newPetData);
    // };
    // reader.readAsDataURL(file);
  }

  const petdata = fullPetData.map((pet) => (
    <tr key={pet.petID}>
      <td>
        <div className="pet-icon">
          <img src={pet.petPicture} height={80} alt={pet.name} />
        </div>
        {editedPetId === pet.petID && (
          <div>
            <input
              id={`fileInput-${pet.petID}`}
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoChange(e, pet.petID)}
            />
          </div>
        )}
      </td>
      <td>{pet.petID}</td>
      <td>
        {editedPetId === pet.petID ? (
          <input
            type="text"
            value={editedPetData.petName || pet.petName}
            onChange={(e) => handleChange(e, 'petName')}
          />
        ) : (
          pet.petName
        )}
      </td>
      <td>
        {editedPetId === pet.petID ? (
          <input
            type="text"
            value={editedPetData.petType || pet.petType}
            onChange={(e) => handleChange(e, 'petType')}
          />
        ) : (
          pet.petType
        )}
      </td>
      <td>
        {editedPetId === pet.petID ? (
          <input
            type="text"
            value={editedPetData.petSex || pet.petSex}
            onChange={(e) => handleChange(e, 'petSex')}
          />
        ) : (
          pet.petSex
        )}
      </td>
      <td>
        {editedPetId === pet.petID ? (
          <input
            type="text"
            value={editedPetData.petBreed || pet.petBreed}
            onChange={(e) => handleChange(e, 'petBreed')}
          />
        ) : (
          pet.petBreed
        )}
      </td>
      <td>
        {editedPetId === pet.petID ? (
          <select
            value={editedPetData.petAvailability || pet.petAvailability}
            onChange={(e) => handleChange(e, 'petAvailability')}
          >
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
            <option value="Adopted">Adopted</option>
            <option value="Pending Adoption">Pending Adoption</option>
          </select>
        ) : (
          pet.petAvailability
        )}
      </td>
      <td>
        {editedPetId === pet.petID ? (
          <IconButton
            aria-label="save"
            size="large"
            onClick={() => handleSave(pet.petID)}
          >
            <SaveRoundedIcon />
          </IconButton>
        ) : (
          <IconButton
            aria-label="edit"
            size="large"
            onClick={() => handleEdit(pet.petID)}
          >
            <EditRoundedIcon />
          </IconButton>
        )}
      </td>
      <td>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => handleDelete(pet.petID)}
        >
          {' '}
          {}
          <DeleteRoundedIcon />
        </IconButton>
      </td>
    </tr>
  ));

  if (petdata.length === 0) {
    return (
      <div className="no-pets">
        <p>There are no pets to display.</p>
      </div>
    );
  }

  return (
    <div className="pets-table">
      <table>
        <thead>
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
        </thead>
        <tbody>{petdata}</tbody>
      </table>
    </div>
  );
}
