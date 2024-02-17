import React, { useState } from 'react';
import data from '../sample/pets.json';
import { lightBlue, pink, grey } from '@mui/material/colors';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import WcRoundedIcon from '@mui/icons-material/WcRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import MonitorWeightRoundedIcon from '@mui/icons-material/MonitorWeightRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import './photocards.css';
import Modal from './Modal';

export default function Photocard() {
    const [likedPets, setLikedPets] = useState([]);

    const toggleLike = (petID) => {
        if (likedPets.includes(petID)) {
            setLikedPets(likedPets.filter(id => id !== petID));
        } else {
            setLikedPets([...likedPets, petID]);
        }
    };

    const [modal, setModal] = useState(false);
    const [pet, setPet] = useState(0);

    const toggleModal = (id) => {
        setPet(id);
        setModal(!modal);
    }

    if (modal) {
        document.body.classList.add('active-modal')
    }
    else {
        document.body.classList.remove('active-modal')
    }

    const petdata = data.pets.map((pet) => (
        <div className="photocard" key={pet.petID}>
            <div onClick={()=> {toggleModal(pet.petID);}}>
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
                        <Modal pet={data.pets[pet]} />
                        <div className="modal-btns">
                            <button className="close-modal" onClick={toggleModal}>
                                <CloseRoundedIcon sx={{color: grey[900], fontSize: 36 }} />
                            </button>

                            <button className="like-modal" onClick={() => toggleLike(pet.petID)}>
                                {likedPets.includes(pet.petID) ? <FavoriteIcon sx={{color: pink[500], fontSize: 36 }} /> : <FavoriteBorderIcon sx={{color: pink[500], fontSize: 36 }}/>} 
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}


