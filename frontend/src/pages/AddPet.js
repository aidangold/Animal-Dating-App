import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './addpet.css';

// !!! Validate user is logged in and has admin role

// https://react.dev/reference/react-dom/components/select#reading-the-select-box-value-when-submitting-a-form

export default function AddPetForm() {
    const handleSubmit = (e) => {
        // Prevent the browser from reloading the page
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        // You can pass formData as a fetch body directly:
        // fetch('/some-api', { method: form.method, body: formData });

        // Or you can get an array of name-value pairs.
        console.log([...formData.entries()]);
    }

    return (
        <div id='crud-main'>
            <h2>Add a Pet</h2>
            <form className="pet-form" method="post" autoComplete="off" onSubmit={handleSubmit}>
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
            </form>
        </div>
    )
}