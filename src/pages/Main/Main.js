import React, { useState } from "react";
import ProjectsSlider from "../../components/ProjectsSlider/ProjectsSlider";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import About from "../../components/About/About";

const Main = () => {
  const location = useLocation();
  const isAbout = location.pathname === "/about";
  const fromIntro = location.state?.fromIntro || false;
  const [isAnimating, setIsAnimating] = useState(isAbout); 
  const [showProjects, setShowProjects] = useState(false);

  
  return (
    <>
      <Header />
      <AnimatePresence>
      {isAbout ? (
          <motion.div
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <About setIsAnimating={setIsAnimating}/>
          </motion.div>
         ) : (
          <motion.div
            key="projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectsSlider 
              startFullScreen={fromIntro} initialImage="/images/FTA.jpg" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Main;