import React, { useEffect, useState } from 'react';
import IntroAnimation from '../../components/Intro/IntroAnimation'; 

const Intro = () => {
    const [key, setKey] = useState(0);
    useEffect(() => {
        const preloadImages = () => {
            const images = document.querySelectorAll('img');
            return Promise.all(
                Array.from(images).map((img) => {
                    return new Promise((resolve) => {
                        if (img.complete) {
                            resolve();
                        } else {
                            img.onload = resolve;
                            img.onerror = resolve;
                        }
                    });
                })
            );
        };

        preloadImages();
        setKey(key + 1);
    }, []);

    return (
        <div>
          <IntroAnimation key={key} />
        </div>
      );
};

export default Intro;
