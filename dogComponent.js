import React, { useState } from 'react';

const DogComponent = () => {
    const [dogData, setDogData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDogData = async () => {
        setLoading(true);
        try {
            const response = await fetch('path/to/your/dog_info.php');
            const data = await response.json();
            setDogData(data);
        } catch (error) {
            console.error('Error fetching dog data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={fetchDogData}>Fetch Dog Breed</button>
            {loading && <p>Loading...</p>}
            {dogData && (
                <div>
                    <h2>{dogData.breed}</h2>
                    <img src={dogData.image} alt={dogData.breed} />
                    <p>{dogData.description}</p>
                    <p>Fetched at: {dogData.fetched_at}</p>
                </div>
            )}
        </div>
    );
};

export default dogComponent;