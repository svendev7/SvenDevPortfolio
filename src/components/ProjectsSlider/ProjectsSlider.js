import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import './ProjectsSliderStyles.css';
import { ArrowRight, ArrowLeft, Code, Zap, Monitor, Layout } from 'lucide-react';
import { SiTypescript, SiJavascript, SiReact, SiNextdotjs, SiGithub } from 'react-icons/si';
import projects from './ProjectsData';
const ProjectsSlider = ({ startFullScreen = false,  initialImage = null  }) => {
    const trackRef = useRef(null);
    const scrollbarRef = useRef(null);
    const initialLoadRef = useRef(true);
    const [isScrollVisible, setIsScrollVisible] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(startFullScreen);
    const [selectedProject, setSelectedProject] = useState(null)
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [opacityDelayed, setOpacityDelayed] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [isDraggingScrollbar, setIsDraggingScrollbar] = useState(false);
    const scrollbarThumbRef = useRef(null);
    const [isExiting, setIsExiting] = useState(false);
    const imageRefs = useRef([]);
    const [showBackButton, setShowBackButton] = useState(true);
    const fullscreenRef = useRef(null);
    const [imageTransitionState, setImageTransitionState] = useState({
        rect: startFullScreen ? {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        } : null,
        objectPosition: '100% center',
        scale: 1
    });
    const handleFullscreenScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        setShowBackButton(scrollTop === 0);
    };

    useEffect(() => {
        if (isFullScreen && fullscreenRef.current) {
            fullscreenRef.current.scrollTo(0, 0);
            setShowBackButton(true);
        }
    }, [selectedProject, isFullScreen]);

    const navigate = (direction) => {
        const newPercentage = sliderState.percentage + (direction === 'left' ? 10 : -10);
        const clamped = Math.max(Math.min(newPercentage, 0), -90);
        
        setSliderState(prev => ({
            ...prev,
            percentage: clamped,
            prevPercentage: clamped
        }));
        updateTrackPosition(clamped);
    };
    const [sliderState, setSliderState] = useState(() => {
        const savedPercentage = sessionStorage.getItem('projectsScrollPercentage');
        const initialPercentage = startFullScreen ? 0 : 
            (savedPercentage !== null ? parseFloat(savedPercentage) : 0);
        
        return {
            mouseDownAt: 0,
            prevPercentage: initialPercentage,
            percentage: initialPercentage
        };
    });

    useEffect(() => {
        if (!startFullScreen && !isFullScreen) {
            sessionStorage.setItem('projectsScrollPercentage', sliderState.percentage);
        }
    }, [sliderState.percentage, startFullScreen, isFullScreen]);

    useEffect(() => {
        if (!startFullScreen && trackRef.current) {
            const savedPercentage = sessionStorage.getItem('projectsScrollPercentage');
            if (savedPercentage !== null) {
                updateTrackPosition(parseFloat(savedPercentage));
            }
        }
    }, [startFullScreen]);


    const updateTrackPosition = (percentage) => {
        const track = trackRef.current;
        if (!track) return;

        track.animate(
            {
                transform: `translate(${percentage}%, -50%)`
            },
            { 
                duration: 600, 
                fill: 'forwards',
                easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)' 
            }
        );

        const images = track.getElementsByClassName("image");
        Array.from(images).forEach((image) => {
            image.animate(
                {
                    objectPosition: `${100 + percentage * 1.1}% center`
                },
                { 
                    duration: 600, 
                    fill: 'forwards',
                    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
                }
            );
        });
    };
    
    
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const handleOnDown = (e) => {
            if (isFullScreen || isDraggingScrollbar) return;
            
            const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
            setSliderState(prev => ({
                ...prev,
                mouseDownAt: clientX
            }));
            setIsDragging(false);
        };

        const handleOnUp = () => {
            if (isFullScreen || isDraggingScrollbar) return;
            
            setSliderState(prev => ({
                ...prev,
                mouseDownAt: 0,
                prevPercentage: prev.percentage
            }));
        };

        const handleOnMove = (e) => {
            if (isFullScreen || isDraggingScrollbar) return;
            
            const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
            
            if (sliderState.mouseDownAt === 0) return;
            setIsDragging(true);

            const mouseDelta = sliderState.mouseDownAt - clientX;
            const maxDelta = window.innerWidth / 0.8;

            const percentage = (mouseDelta / maxDelta) * -100;
            const nextPercentageUnconstrained = sliderState.prevPercentage + percentage;
            const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -90);

            setSliderState(prev => ({
                ...prev,
                percentage: nextPercentage
            }));

            updateTrackPosition(nextPercentage);
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
    }, [isFullScreen, sliderState, isDraggingScrollbar]);

    const handleScrollbarMouseDown = (e) => {
        if (isFullScreen) return;
        
        setIsDraggingScrollbar(true);
        const scrollbar = scrollbarRef.current;
        const thumb = scrollbarThumbRef.current;
        
        if (!scrollbar || !thumb) return;

        const scrollbarRect = scrollbar.getBoundingClientRect();
        const clickPosition = (e.clientX - scrollbarRect.left) / scrollbarRect.width;
        const percentage = Math.max(Math.min(clickPosition * -100, 0), -90);

        setSliderState(prev => ({
            ...prev,
            percentage: percentage,
            prevPercentage: percentage
        }));

        updateTrackPosition(percentage);
    };

    const handleScrollbarMouseMove = (e) => {
        if (!isDraggingScrollbar || isFullScreen) return;

        const scrollbar = scrollbarRef.current;
        if (!scrollbar) return;

        const scrollbarRect = scrollbar.getBoundingClientRect();
        const position = (e.clientX - scrollbarRect.left) / scrollbarRect.width;
        const percentage = Math.max(Math.min(position * -100, 0), -90);

        setSliderState(prev => ({
            ...prev,
            percentage: percentage,
            prevPercentage: percentage
        }));

        updateTrackPosition(percentage);
    };

    const handleScrollbarMouseUp = () => {
        setIsDraggingScrollbar(false);
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleScrollbarMouseMove);
        window.addEventListener('mouseup', handleScrollbarMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleScrollbarMouseMove);
            window.removeEventListener('mouseup', handleScrollbarMouseUp);
        };
    }, [isDraggingScrollbar]);

    const handleImageClick = (e, project, index) => {
        if (isDragging) return;
        setIsScrollVisible(true);
        const imgElement = e.target;
        const rect = imgElement.getBoundingClientRect();
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
            scale: 1
        });

        setSelectedProject(project);
        setSelectedIndex(index);
        setIsFullScreen(true);
    };

    const handleFullScreenClose = () => {
        setIsScrollVisible(false)
        setIsFullScreen(false);
        setSelectedProject(null);
        setImageTransitionState(prev => ({
            ...prev,
            rect: null
        }));
    };
    
   
    useEffect(() => {
        if (initialLoadRef.current && startFullScreen) {

            setIsFullScreen(true);
            setSelectedProject(projects[0]);

            setTimeout(() => {
                const imgElement = imageRefs.current[0];
                if (imgElement) {
                    const rect = imgElement.getBoundingClientRect();
                    const computedStyle = window.getComputedStyle(imgElement);
                    
                    setImageTransitionState({
                        rect: {
                            top: rect.top,
                            left: rect.left,
                            width: rect.width,
                            height: rect.height
                        },
                        objectPosition: computedStyle.objectPosition,
                        scale: 1
                    });
                }
                initialLoadRef.current = false;
            },500); 
        }
    }, [startFullScreen, projects]);
    return (
        <LayoutGroup>
            <AnimatePresence>
            {showBackButton && isFullScreen && (
                <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="back-text"
                onClick={handleFullScreenClose}
            >
                <ArrowLeft size={24} />
                Back
            </motion.div>
            )}
        </AnimatePresence>
            <div 
                id="image-track" 
                ref={trackRef} 
                style={{ 
                    transform: `translate(${sliderState.percentage}%, -50%)`,
                    opacity: isFullScreen ? 0 : 1,
                    transition: 'opacity 0.4s ease-in-out'
                }}
            >
                {projects.map((project, index) => (
                    <motion.img
                        layoutId={`image-${index}`}
                        key={project.sliderImage}
                        className="image"
                        src={project.sliderImage}
                        alt={project.title}
                        draggable="false"
                        onClick={(e) => handleImageClick(e, project, index)}
                        whileHover={{ scale: 1.05 }}
                        style={{
                            cursor: 'pointer',
                            willChange: 'transform'
                        }}
                        ref={(el) => (imageRefs.current[index] = el)}
                    />
                ))}
            </div>

            <div 
                className="image-scrollbar" 
                ref={scrollbarRef}
                onMouseDown={handleScrollbarMouseDown}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '50%',
                    height: '4px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    cursor: 'pointer',
                    borderRadius: '2px',
                    opacity: isFullScreen ? 0 : 1,
                    transition: 'opacity 0.4s ease-in-out'
                }}
            >
                <div
                    ref={scrollbarThumbRef}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: `${Math.abs(sliderState.percentage)}%`,
                        width: '10%',
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '2px',
                        cursor: 'pointer'
                    }}
                />
            </div>

            <AnimatePresence>
  {isFullScreen && imageTransitionState.rect && selectedProject && (
    <motion.div
      ref={fullscreenRef}
      initial={{
        position: 'fixed',
        top: imageTransitionState.rect.top,
        left: imageTransitionState.rect.left,
        width: imageTransitionState.rect.width,
        height: imageTransitionState.rect.height,
        scale: imageTransitionState.scale,
        backgroundColor: 'black',
        zIndex: 200,
        overflow: 'hidden'
      }}
      animate={{
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        scale: 1,
        overflowY: 'auto'
      }}
      exit={{
        top: imageTransitionState.rect.top,
        left: imageTransitionState.rect.left,
        width: imageTransitionState.rect.width,
        height: imageTransitionState.rect.height,
        scale: imageTransitionState.scale,
        overflow: 'hidden'
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="custom-scrollbar"
      onScroll={handleFullscreenScroll}
    >
      <motion.img
        src={selectedProject.sliderImage}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: imageTransitionState.objectPosition,
          transform: `scale(${imageTransitionState.scale})`,
          transformOrigin: 'center center',
          pointerEvents: 'none'
        }}
        alt="Full screen view"
      />
      <motion.div
        className="project-details"
        initial={{ opacity: 0, x: 50}}
        animate={{ opacity: 1, x: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <motion.div
          className="left-column"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
        >
          <img
            src={selectedProject.projectImage}
            alt={selectedProject.title}
            className="project-image"
          />
          <div className="tech-icons">
          <div className="made-with-text">Made with:</div>
            {selectedProject.techIcons.map((icon, idx) => (
              <motion.span 
                key={idx} 
                className="tech-icon-wrapper"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {icon}
              </motion.span>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="right-column"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>{selectedProject.title}</h2>
          <p>{selectedProject.description}</p>
          <div className="info-footer">
          <motion.div
            className="visit-section"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
        >
            <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="visit-button nav-button"
            >
            <span>Visit</span>
            <SiGithub key="github" size={20} title="Visit"  className="tech-icon" />
            </a>
            </motion.div>
                <motion.div
                className="project-date"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                    >
                <span>{selectedProject.completed}</span>
                </motion.div>
            </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
        </LayoutGroup>
    );
};

export default ProjectsSlider;