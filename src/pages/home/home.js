import React, { useState } from 'react';
import ImageSlider from '../../components/ImageSlider/ImageSlider';

const Home = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    return (
        <div>
            <ImageSlider 
                isFullScreen={isFullScreen}
                selectedImage={selectedImage}
                setIsFullScreen={setIsFullScreen}
                setSelectedImage={setSelectedImage}
            />
        </div>
    );
};

export default Home;
