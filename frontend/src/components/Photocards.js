import data from '../sample/pets.json';

export default function Photocard() {
    const petdata = data.pets.map((pet) => (
        <li key={pet.id}>
            <img
                src={require('../sample/photos/' + pet.photo + '.jpg')}
                height={400}
                alt={pet.name}
            />
            <h2>{pet.name}</h2>
            <ul>
                <li className="pet-sex">{pet.sex}</li>
                <li className="pet-age">{pet.age}</li>
                <li className="pet-weight">{pet.weight}</li>
                <li className="pet-date">{pet.date}</li>
            </ul>
            <p>{pet.status}</p>
        </li>
    ))
    return (
        <ul>{petdata}</ul>
    )
}