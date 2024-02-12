import React, { useState } from 'react';
import data from '../sample/pets.json';
import { lightBlue } from '@mui/material/colors';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import WcRoundedIcon from '@mui/icons-material/WcRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import MonitorWeightRoundedIcon from '@mui/icons-material/MonitorWeightRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './photocards.css';

export default function Photocard() {
    const [likedPets, setLikedPets] = useState([]);

    const toggleLike = (petID) => {
        if (likedPets.includes(petID)) {
            setLikedPets(likedPets.filter(id => id !== petID));
        } else {
            setLikedPets([...likedPets, petID]);
        }
    };

    const petdata = data.pets.map((pet) => (
        <div className="photocard" key={pet.petID}>
            <img
                src={require('../sample/photos/' + pet.petPicture + '.jpg')}
                height={400}
                alt={pet.name}
            />
            <h2>{pet.petName}</h2>
            <ul>
                <li><PetsRoundedIcon sx={{ fontSize: 16, color: lightBlue[900] }} /></li>
                <li>{pet.petType}</li>
                <li><WcRoundedIcon sx={{ fontSize: 16, color: lightBlue[900] }} /></li>
                <li>{pet.petSex}</li>
                <li><TodayRoundedIcon sx={{ fontSize: 16, color: lightBlue[900] }} /></li>
                <li>{pet.petAge}</li>
                <li><MonitorWeightRoundedIcon sx={{ fontSize: 16, color: lightBlue[900] }} /></li>
                <li>{pet.petWeight}</li>
                <li><EventAvailableRoundedIcon sx={{ fontSize: 16, color: lightBlue[900] }} /></li>
                <li>{pet.addedDate}</li>
            </ul>
            <h3>{pet.petAvailability}</h3>

            <button className="like-button" onClick={() => toggleLike(pet.petID)}>
                {likedPets.includes(pet.petID) ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </button>
            
        </div>
    ));

    return (
        <div className="photocards">{petdata}</div>
    );
}


