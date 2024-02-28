import { useState, useEffect } from "react";
import Matchfilter from '../components/Matchfilter';
import Photocards from '../components/Photocards';
import { filterPets } from '../components/filterPets';
import './matching.css';

// Function to return true if pet's Availability is "Available"
const filterAvailable = (pets) => {
    return pets.petAvailability === "Available";
}

export default function Matching() {
    // fetch and store full pet data
    const [fullPetData, setFullPetData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/pets')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            setFullPetData(data);
        })
        .catch(function(error) {
            console.log('Request failed', error);
            window.location.reload(false);
        });
    }, []);

    // array of pets (objects) that are "Available" for display on page
    const availablePets = fullPetData.filter(filterAvailable);
    
    const [isFilter, setIsFilter] = useState({
        0: [],    // type
        1: [],    // sex
        2: [],    // age
        3: []     // weight 
    });

    function filterClick(index, selected) {
        if (selected === 'any') {
            // if any is selected, chip is displayed active if less than max num of states
            if (isFilter[index].length > 0) {
                setIsFilter({...isFilter, [index]: []});
            }
        }
        else {
            // add selected to states
            if (!isFilter[index].includes(selected)) {
                setIsFilter({
                    ...isFilter,
                    [index]: [...isFilter[index], selected]
                });
            }
            // deselect
            else {
                if (isFilter[index].length == 1) {
                    setIsFilter({
                        ...isFilter,
                        [index]: []
                    });
                }
                else {
                    setIsFilter({
                        ...isFilter,
                        [index]: isFilter[index].filter(a => a !== selected)
                    });
                }      
            }
        }
    }

    // filter pets depending on filter state
    const petsData = filterPets(availablePets, isFilter);

    return (
        <>
            <div className="filter-button">
                <Matchfilter 
                    isFilter={isFilter}
                    filterClick={filterClick} />
            </div>
            
            <div className="matching-main">
                <Photocards 
                    petsData={petsData} />
            </div>
        </>
    )
}