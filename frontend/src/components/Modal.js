import { format, parseJSON } from "date-fns";

// modal tutorial by The Web School. https://www.youtube.com/watch?v=9DwGahSqcEc
export default function Modal({pet}) {
    const formattedDate = format(pet.addedData, 'MMM do, yyyy')

    return (
        <>
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
                        <td>{pet.petWeight}</td>
                        <td>{pet.petAge}</td>
                        <td>{formattedDate}</td>
                        <td>{pet.petAvailability}</td>
                    </tr>
                </tbody>
            </table>
            <h3>Description</h3>
            <p>{pet.petDescription}</p>
        </>
    )
}