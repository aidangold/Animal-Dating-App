const BASE_URL = 'http://localhost:5000'; // backend url but update when deployed

export const addToFavorites = async (userID, petID) => {
    try {
        const response = await fetch(`${BASE_URL}/favorites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID: userID,
                petID: petID
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding to favorites:', error);
        throw new Error('Failed to add to favorites');
    }
};

export const removeFromFavorites = async (userID, petID) => {
    try {
        const response = await fetch(`${BASE_URL}/favorites/unfavorite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID: userID,
                petID: petID
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error removing from favorites:', error);
        throw new Error('Failed to remove from favorites');
    }
};

