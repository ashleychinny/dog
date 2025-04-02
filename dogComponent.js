import React, { useState } from 'react';

const DogComponent = () => {
    const [dogData, setDogData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDogData = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://your-server-url/dog_info.php');
            const data = await response.json();
            setDogData(data);
        } catch (error) {
            console.error('Error fetching dog data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dog-component">
            <button onClick={fetchDogData} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Dog Breed'}
            </button>
            {dogData && (
                <div>
                    <h1>{dogData.breed}</h1>
                    <img src={dogData.image} alt={dogData.breed} style={{ maxWidth: '100%' }} />
                    <p>{dogData.description}</p>
                    <small>Fetched at: {dogData.fetched_at}</small>
                </div>
            )}
        </div>
    );
};

export default DogComponent;