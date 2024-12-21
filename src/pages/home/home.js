import React, { useState } from 'react';
import ImageSlider from '../../components/ImageSlider/ImageSlider'; 
const Home = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const handleImageClick = (src) => {
        if (isFullScreen && selectedImage === src) {
            setIsFullScreen(false);
        } else {
            setSelectedImage(src);
            setIsFullScreen(true);
        }
    };

    return (
        <div>
            <ImageSlider onImageClick={handleImageClick} isFullScreen={isFullScreen} selectedImage={selectedImage} />
        </div>
    );
};

export default Home;
