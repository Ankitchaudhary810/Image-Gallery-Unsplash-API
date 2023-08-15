// src/App.jsx
import React, { useState } from 'react';
import './Page.css';

const App = () => {
    const apiKey = "YOUR-UNSPLASH-KEY";
    const [categoryName, setCategoryName] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setCategoryName(event.target.value);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.unsplash.com/search/photos?query=${categoryName}&client_id=${apiKey}`);
            const data = await response.json();
            const result = data.results;
            setImages(result);
        } catch (error) {
            console.error('Error fetching images:', error);
            setImages([]);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div>
            <h3 className='heading'>Picture Gallery Application</h3>
            <div className='input-box'>
                <input
                    type='text'
                    placeholder='Enter Category name'
                    value={categoryName}
                    onChange={handleInputChange}
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <div className='grid'>
                {loading ? (
                    <p>Loading......</p>
                ) : (
                    images.length === 0 ? (
                        <p>No images found.</p>
                    ) : (
                        images.map((image) => (
                            <div className='image-card' key={image.id}>
                                <img src={image.urls.small} alt={image.alt_description} />
                                <h4>{image.user.name}</h4>
                                <p>{image.description || 'No description available'}</p>
                                <a
                                    href={image.links.html}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    View on Unsplash
                                </a>
                            </div>
                        ))
                    )
                )}
                {images.length === 0 && !loading && <p>No images found.</p>}
            </div>
        </div>
    );
};

export default App;
