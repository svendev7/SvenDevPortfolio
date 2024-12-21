 import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import ImageSlider from '../../components/ImageSlider/ImageSlider'; 
import './IntroAnimationStyles.css';

const IntroAnimation = ({ onAnimationEnd }) => {
    const containerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [animationFinished, setAnimationFinished] = useState(false);  // New state to track animation end
  
    useEffect(() => {
      const preloadImages = () => {
        const images = document.querySelectorAll('img');
        return Promise.all(
          Array.from(images).map((img) =>
            new Promise((resolve) => {
              if (img.complete) {
                resolve();
              } else {
                img.onload = resolve;
                img.onerror = resolve;
              }
            })
          )
        );
      };

      preloadImages().then(() => {
        // Set loading to false and fade out loader
        gsap.to(".loader", {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            setIsLoading(false);
            
            // Start main animation
            let tl = gsap.timeline({ delay: 0 });

            tl.to(".col", {
              top: 0,
              duration: 3,
              ease: "power4.inOut"
            });

            tl.to(".c-1 .item", {
              top: 0,
              stagger: 0.25,
              duration: 3,
              ease: "power4.inOut"
            }, "-=2");

            tl.to(".c-2 .item", {
              top: 0,
              stagger: -0.25,
              duration: 3,
              ease: "power4.inOut"
            }, "-=4");

            tl.to(".c-3 .item", {
              top: 0,
              stagger: 0.25,
              duration: 3,
              ease: "power4.inOut"
            }, "-=4");

            tl.to(".c-4 .item", {
              top: 0,
              stagger: -0.25,
              duration: 3,
              ease: "power4.inOut"
            }, "-=4");

            tl.to(".c-5 .item", {
              top: 0,
              stagger: 0.25,
              duration: 3,
              ease: "power4.inOut"
            }, "-=4");

            tl.to(".container", {
              scale: 6,
              duration: 4,
              ease: "power4.inOut"
            }, "-=2");

            tl.to(".nav-item a, .title p, .slide-num p, .preview img", {
              top: 0,
              stagger: 0.075,
              duration: 1,
              ease: "power3.out"
            }, "-=1.5");

            tl.to(".icon ion-icon, .icon-2 ion-icon", {
              scale: 1,
              stagger: 0.05,
              ease: "power3.out"
            }, "-=1");

            // Set animationFinished to true after animation ends
            tl.eventCallback("onComplete", () => {
              setAnimationFinished(true);  // Trigger transition to ImageSlider
            });
          }
        });
      });
    }, []);

    if (animationFinished) {
      return <ImageSlider />;  // Render the ImageSlider component when animation finishes
    }

    return (
      <div className="main-container">
        {isLoading && (
          <div className="loader">
            <div className="loader-dot"></div>
            <p>Loading</p>
          </div>
        )}
        <div className="intro-container">
          <div className="container" ref={containerRef}>
            <div className="col c-1">
              <div className="item"><img src="/images/15.jpg" alt="" /></div>
              <div className="item"><img src="/images/2.jpg" alt="" /></div>
              <div className="item"><img src="/images/3.jpg" alt="" /></div>
              <div className="item"><img src="/images/4.jpg" alt="" /></div>
              <div className="item"><img src="/images/5.jpg" alt="" /></div>
            </div>
          <div className="col c-2">
            <div className="item"><img src="/images/6.jpg" alt="" /></div>
            <div className="item"><img src="/images/7.jpg" alt="" /></div>
            <div className="item"><img src="/images/8.jpg" alt="" /></div>
            <div className="item"><img src="/images/9.jpg" alt="" /></div>
            <div className="item"><img src="/images/10.jpg" alt="" /></div>
          </div>
          <div className="col c-3">
            <div className="item"><img src="/images/11.jpg" alt="" /></div>
            <div className="item"><img src="/images/12.jpg" alt="" /></div>
            <div className="item"><img src="/images/1.jpg" alt="" /></div>
            <div className="item"><img src="/images/14.jpg" alt="" /></div>
            <div className="item"><img src="/images/15.jpg" alt="" /></div>
          </div>
          <div className="col c-4">
            <div className="item"><img src="/images/1.jpg" alt="" /></div>
            <div className="item"><img src="/images/2.jpg" alt="" /></div>
            <div className="item"><img src="/images/3.jpg" alt="" /></div>
            <div className="item"><img src="/images/4.jpg" alt="" /></div>
            <div className="item"><img src="/images/5.jpg" alt="" /></div>
          </div>
          <div className="col c-5">
            <div className="item"><img src="/images/6.jpg" alt="" /></div>
            <div className="item"><img src="/images/7.jpg" alt="" /></div>
            <div className="item"><img src="/images/8.jpg" alt="" /></div>
            <div className="item"><img src="/images/9.jpg" alt="" /></div>
            <div className="item"><img src="/images/10.jpg" alt="" /></div>
          </div>
          </div>
          <div className="content">
            <nav>
              <div className="nav-item">
                <a href="#" id="active">Projects</a>
              </div>
              <div className="nav-item">
                <a href="#">Contact</a>
              </div>
            </nav>
            <div className="hero">
              <div className="icon"><ion-icon name="add-sharp"></ion-icon></div>
              <div className="title"><p>Svens Portfolio</p></div>
              <div className="icon-2"><ion-icon name="add-sharp"></ion-icon></div>
            </div>
            {/* <footer>
            <div className="preview">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <img key={num} src={`/images/${num}.jpg`} alt="" />
              ))}
            </div>
            <div className="slide-num"><p>1 &mdash; 3</p></div>
          </footer> */}
          </div>
        </div>
      </div>
    );
};

export default IntroAnimation;