import React, { useState } from 'react';
import { format } from "date-fns";
import { lightBlue } from '@mui/material/colors';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import WcRoundedIcon from '@mui/icons-material/WcRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import MonitorWeightRoundedIcon from '@mui/icons-material/MonitorWeightRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './photocards.css';
import Modal from './Modal';


export default function Photocard({ petsData }) {
    // like pets functionality
    const [likedPets, setLikedPets] = useState([]);

    function toggleLike(petID) {
        if (likedPets.includes(petID)) {
            setLikedPets(likedPets.filter(id => id !== petID));
        } else {
            setLikedPets([...likedPets, petID]);
        }
    };

    // modal states
    const [modal, setModal] = useState(false);
    const [pet, setPet] = useState(0);

    const toggleModal = (id) => {
        setPet(id);
        setModal(!modal);
    }

    // Prevents scrolling in main content when modal is open
    if (modal) {
        document.body.classList.add('active-modal')
    }
    else {
        document.body.classList.remove('active-modal')
    }

    // map each individual pet to photocard
    const petdata = petsData.map((pet) => (
        <div className="photocard" key={pet.petID}>
            <div onClick={()=> {toggleModal(pet.petID);}}>
                <img
                    src={pet.petPicture}
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
                    <li>{pet.petAgeInYears} yrs</li>
                    <li><MonitorWeightRoundedIcon sx={{ fontSize: 16, color: lightBlue[900] }} /></li>
                    <li>{pet.petWeight} lbs</li>
                    <li><EventAvailableRoundedIcon sx={{ fontSize: 16, color: lightBlue[900] }} /></li>
                    <li>{format(pet.addedData, 'MM/dd/yy')}</li>
                </ul>
                <h3>{pet.petAvailability}</h3>
            </div>

            <button className="like-button" onClick={() => toggleLike(pet.petID)}>
                {likedPets.includes(pet.petID) ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />} 
            </button>
        </div>
    ));

    return (
        <>
            <div className="photocards">{petdata}</div>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <Modal 
                            likedPets={likedPets}
                            toggleLike={toggleLike}
                            toggleModal={toggleModal}
                            pet={petsData.find(p => p.petID === pet)} />
                    </div>
                </div>
            )}
        </>
    );
}


