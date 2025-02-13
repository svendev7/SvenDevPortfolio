import React, { useState } from 'react';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import Header from '../../components/Header/Header';
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
