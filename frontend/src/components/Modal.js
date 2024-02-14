import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import WcRoundedIcon from '@mui/icons-material/WcRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import MonitorWeightRoundedIcon from '@mui/icons-material/MonitorWeightRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import { lightBlue } from '@mui/material/colors';

// modal tutorial by The Web School. https://www.youtube.com/watch?v=9DwGahSqcEc
export default function Modal({pet}) {

    return (
        <>
            <img
                src={require('../sample/photos/' + pet.petPicture + '.jpg')}
                alt={pet.name} />

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
                    <li>{pet.petAvailability}</li>
                </ul>
                <p>{pet.petDescription}</p>
        </>
    )
}