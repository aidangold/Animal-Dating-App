import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import WcRoundedIcon from '@mui/icons-material/WcRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import MonitorWeightRoundedIcon from '@mui/icons-material/MonitorWeightRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import { lightBlue } from '@mui/material/colors';
import Divider from '@mui/material/Divider';

// modal tutorial by The Web School. https://www.youtube.com/watch?v=9DwGahSqcEc
export default function Modal({pet}) {

    return (
        <>
            <img
                src={require('../sample/photos/' + pet.petPicture + '.jpg')}
                alt={pet.name} />

            <h2>{pet.petName}</h2>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Breed</th>
                    <th>Sex</th>
                    <th>Weight</th>
                    <th>Age</th>
                    <th>Aquired</th>
                    <th>Availability</th>
                </tr>
                <tr>
                    <td>{pet.petID}</td>
                    <td>{pet.petType}</td>
                    <td>{pet.petBreed}</td>
                    <td>{pet.petSex}</td>
                    <td>{pet.petWeight}</td>
                    <td>{pet.petAge}</td>
                    <td>{pet.addedData}</td>
                    <td>{pet.petAvailability}</td>
                </tr>
            </table>
            <h3>Description</h3>
            <p>{pet.petDescription}</p>
        </>
    )
}