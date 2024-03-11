import { format } from 'date-fns';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink, lightBlue, grey } from '@mui/material/colors';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Chip from '@mui/material/Chip';

// modal tutorial by The Web School. https://www.youtube.com/watch?v=9DwGahSqcEc
export default function Modal({ likedPets, toggleLike, toggleModal, pet }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: pink[300],
      },
      secondary: {
        main: lightBlue[300],
      },
    },
  });

  const formattedDate = format(pet.addedDate, 'MMM do, yyyy');

  return (
    <ThemeProvider theme={theme}>
      <img src={pet.petPicture} alt={pet.name} />

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
            <td>
              {pet.petAgeInYears} yrs {pet.petAgeInMonths} mos
            </td>
            <td>{formattedDate}</td>
            <td>{pet.petAvailability}</td>
          </tr>
        </tbody>
      </table>
      <div className="modal-chips">
        {pet.goodWithAnimals ? (
          <Chip label="Good With Animals" color="primary" />
        ) : (
          <Chip label="Good With Animals" variant="outlined" />
        )}
        {pet.goodWithChildren ? (
          <Chip label="Good With Children" color="primary" />
        ) : (
          <Chip label="Good With Children" variant="outlined" />
        )}
        {pet.mustBeLeashed ? (
          <Chip label="Must Be Leashed" color="primary" />
        ) : (
          <Chip label="Must Be Leashed" variant="outlined" />
        )}
      </div>
      <h3>Description</h3>
      <p>{pet.petDescription}</p>
      <div className="modal-btns">
        <button className="close-modal" onClick={toggleModal}>
          <CloseRoundedIcon sx={{ color: grey[900], fontSize: 36 }} />
        </button>

        <button className="like-modal" onClick={() => toggleLike(pet.petID)}>
          {likedPets.includes(pet.petID) ? (
            <FavoriteIcon sx={{ color: pink[500], fontSize: 36 }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: pink[500], fontSize: 36 }} />
          )}
        </button>
      </div>
    </ThemeProvider>
  );
}
