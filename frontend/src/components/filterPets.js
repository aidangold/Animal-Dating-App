export function filterPets(availablePets, isFilter) {
    let filteredPets = availablePets;
    if (isFilter[0].length == 1) {
        if (isFilter[0].includes('dog')) {
            filteredPets = availablePets.filter((pet) => pet.petType === 'Dog');
        }
        else {
            filteredPets = availablePets.filter((pet) => pet.petType === 'Cat');
        }
    }
    return filteredPets
}