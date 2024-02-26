import { format } from "date-fns";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { pink, lightBlue } from '@mui/material/colors';
import Chip from '@mui/material/Chip';

// modal tutorial by The Web School. https://www.youtube.com/watch?v=9DwGahSqcEc
export default function Modal({pet}) {
    const theme = createTheme({
        palette: {
          primary: {
            main: pink[300],
        },
          secondary: {
            main: lightBlue[300],
        }
      }});

    const formattedDate = format(pet.addedData, 'MMM do, yyyy')

    return (
        <ThemeProvider theme={theme}>
            <img
                src={pet.petPicture}
                alt={pet.name} />

            <h2>{pet.petName}</h2>
            <table>
                <tbody>
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
                        <td>{pet.petWeight} lbs</td>
                        <td>{pet.petAge} yrs</td>
                        <td>{formattedDate}</td>
                        <td>{pet.petAvailability}</td>
                    </tr>
                </tbody>
            </table>
            <div className="modal-chips">
                {pet.goodWithAnimals ? <Chip label='Good With Animals' color="primary" /> : <Chip label='Good With Animals' variant='outlined' />}
                {pet.goodWithChildren ? <Chip label='Good With Children' color="primary" /> : <Chip label='Good With Children' variant='outlined' />}
                {pet.mustBeLeashed ? <Chip label='Must Be Leashed' color="primary" /> : <Chip label='Must Be Leashed' variant='outlined' />}
            </div>
            <h3>Description</h3>
            <p>{pet.petDescription}</p>
        </ThemeProvider>
    )
}