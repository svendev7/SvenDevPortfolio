import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import '../styles/ImageSliderStyles.css';

const ImageSlider = () => {
    const trackRef = useRef(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [imageTransitionState, setImageTransitionState] = useState({
        rect: null,
        objectPosition: '100% center',
        scale: 1
    });

    const [sliderState, setSliderState] = useState({
        mouseDownAt: 0,
        prevPercentage: 0,
        percentage: 0
    });

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const handleOnDown = (e) => {
            if (isFullScreen) return;
            
            const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
            setSliderState(prev => ({
                ...prev,
                mouseDownAt: clientX
            }));
        };

        const handleOnUp = () => {
            if (isFullScreen) return;
            
            setSliderState(prev => ({
                ...prev,
                mouseDownAt: 0,
                prevPercentage: prev.percentage
            }));
        };

        const handleOnMove = (e) => {
            if (isFullScreen) return;
            
            const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
            
            if (sliderState.mouseDownAt === 0) return;

            const mouseDelta = sliderState.mouseDownAt - clientX;
            const maxDelta = window.innerWidth / 2;

            const percentage = (mouseDelta / maxDelta) * -100;
            const nextPercentageUnconstrained = sliderState.prevPercentage + percentage;
            const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

            setSliderState(prev => ({
                ...prev,
                percentage: nextPercentage
            }));

            if (track) {
                track.animate(
                    {
                        transform: `translate(${nextPercentage}%, -50%)`
                    },
                    { duration: 1200, fill: 'forwards' }
                );

                const images = track.getElementsByClassName("image");
                Array.from(images).forEach((image) => {
                    image.animate(
                        {
                            objectPosition: `${100 + nextPercentage}% center`
                        },
                        { 
                            duration: 1200, 
                            fill: 'forwards' 
                        }
                    );
                });
            }
        };

        window.addEventListener('mousedown', handleOnDown);
        window.addEventListener('mousemove', handleOnMove);
        window.addEventListener('mouseup', handleOnUp);
        
        window.addEventListener('touchstart', handleOnDown);
        window.addEventListener('touchmove', handleOnMove);
        window.addEventListener('touchend', handleOnUp);

        return () => {
            window.removeEventListener('mousedown', handleOnDown);
            window.removeEventListener('mousemove', handleOnMove);
            window.removeEventListener('mouseup', handleOnUp);
            
            window.removeEventListener('touchstart', handleOnDown);
            window.removeEventListener('touchmove', handleOnMove);
            window.removeEventListener('touchend', handleOnUp);
        };
    }, [isFullScreen, sliderState]);

    const handleImageClick = (e, src, index) => {
        // If already in full screen and clicking the same image, close it
        if (isFullScreen && selectedImage === src) {
            setIsFullScreen(false);
            setSelectedImage(null);
            return;
        }

        // Capture the exact state of the image at click
        const imgElement = e.target;
        const rect = imgElement.getBoundingClientRect();
        
        // Get computed style to capture exact object-position
        const computedStyle = window.getComputedStyle(imgElement);
        const objectPosition = computedStyle.objectPosition;

        setImageTransitionState({
            rect: {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            },
            objectPosition,
            scale: 1  // Matches the hover scale
        });

        // Set full screen state
        setSelectedImage(src);
        setSelectedIndex(index);
        setIsFullScreen(true);
    };

    const images = Array.from({ length: 10 }, (_, index) => `/images/${index + 1}.jpg`);

    return (
        <LayoutGroup>
            <div 
                id="image-track" 
                ref={trackRef} 
                style={{ 
                    transform: `translate(${sliderState.percentage}%, -50%)` 
                }}
            >
                {images.map((src, index) => (
                    <motion.img
                        layoutId={`image-${index}`}
                        key={src}
                        className="image"
                        src={src}
                        alt={`Image ${index + 1}`}
                        draggable="false"
                        onClick={(e) => handleImageClick(e, src, index)}
                        whileHover={{ scale: 1.05, duration: 2}}
                        style={{
                            cursor: 'pointer',
                            willChange: 'transform',
                        }}
                    />
                ))}
            </div>

            <AnimatePresence>
                {isFullScreen && imageTransitionState.rect && (
                    <motion.div
                        initial={{
                            position: 'fixed',
                            top: imageTransitionState.rect.top,
                            left: imageTransitionState.rect.left,
                            width: imageTransitionState.rect.width,
                            height: imageTransitionState.rect.height,
                            scale: imageTransitionState.scale,
                            backgroundColor: 'black',
                            zIndex: 1000,
                            overflow: 'hidden'
                        }}
                        animate={{
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            scale: 1
                        }}
                        exit={{
                            top: imageTransitionState.rect.top,
                            left: imageTransitionState.rect.left,
                            width: imageTransitionState.rect.width,
                            height: imageTransitionState.rect.height,
                            scale: imageTransitionState.scale
                        }}
                        transition={{
                            duration: 0.4,
                            type: "tween"
                        }}
                        onClick={() => setIsFullScreen(false)}
                    >
                        <motion.img
                            src={selectedImage}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: imageTransitionState.objectPosition,
                                transform: `scale(${imageTransitionState.scale})`,
                                transformOrigin: 'center center'
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </LayoutGroup>
    );
};

export default ImageSlider;