export function filterPets(availablePets, isFilter) {
    let filteredPets = availablePets;

    // filter dogs/cats
    if (isFilter[0].length == 1) {
        if (isFilter[0].includes('dog')) {
            filteredPets = filteredPets.filter((pet) => pet.petType === 'Dog');
        }
        else {
            filteredPets = filteredPets.filter((pet) => pet.petType === 'Cat');
        }
    }
    
    // filter male/female
    if (isFilter[1].length == 1) {
        if (isFilter[1].includes('male')) {
            filteredPets = filteredPets.filter((pet) => pet.petSex === 'Male');
        }
        else {
            filteredPets = filteredPets.filter((pet) => pet.petSex === 'Female');
        }
    }

    // filter age
    if (isFilter[2].length > 0 && isFilter[2].length < 4) {
        let min1 = -1
        let max1 = 30
        let min2 = -1
        let max2 = 30
        if (isFilter[2].includes('a01')) {
            min1 = 0
            max1 = 1
        }
        if (isFilter[2].includes('a15')) {
            if (min1 < 0) {
                min1 = 1
                max1 = 5
            }
            if (max1 < 5) {
                max1 = 5
            }
        }
        if (isFilter[2].includes('a510')) {
            if (min1 < 0) {
                min1 = 5
                max1 = 10
            }
            if (max1 < 10) {
                // if user selected 0-1 but did not select 1-5
                if (max1 === 1) {
                    min2 = 5
                    max2 = 10
                }
                else {
                    max2 = 10
                }
            }
        }
        if (isFilter[2].includes('a10p')) {
            if (min1 < 0) {
                min1 = 10
            }
            if (max1 < 11) {
                // if user did not select 5-10
                if (max1 !== 10) {
                    min2 = 10
                }
            }
        }

        // filter ages with given min(s) and max(s)
        if (min1 >= 0 && min2 >= 0) {
            filteredPets = filteredPets.filter((pet) => (
                min1 <= pet.petAgeInYears && pet.petAgeInYears < max1
                && min2 < pet.petAgeInYears && pet.petAgeInYears < max2
                ))
        }
        else {
            filteredPets = filteredPets.filter((pet) => (
                min1 <= pet.petAgeInYears && pet.petAgeInYears < max1
            ))
        }
    }

    // filter age(s)
    return filteredPets
}