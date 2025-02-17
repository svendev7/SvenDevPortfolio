import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import "./AboutStyles.css";
import { LanguageContext } from "../../LanguageContext";
const boxVariants = {
  hidden: { opacity: 0, y: 500 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay },
  }),
};

const Box = ({ title, subtitle, width, height, delay, onAnimationComplete }) => {
  return (
    <motion.div
      className="box"
      style={{ width: `${width}px`, height: `${height}px` }}
      variants={boxVariants}
      initial="hidden"
      animate="visible"
      custom={delay}
      whileHover={{ scale: 1.02 }}
      onAnimationComplete={onAnimationComplete}
    >
      <h3 className="box-title">{title}</h3>
      <p className="box-subtitle">{subtitle}</p>
    </motion.div>
  );
};

const About = ({ setIsAnimating }) => {
  const [animationsComplete, setAnimationsComplete] = useState(0);
  const totalBoxes = 6; 
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    if (animationsComplete === totalBoxes) {
      setIsAnimating(false); 
    }
  }, [animationsComplete, setIsAnimating]);

  return (
    <div className="about-container">
      <div className="columns-container">
        <div className="column">
          <Box 
          title={language === 'nl' ? 'Over' : 'About'}
          subtitle={language === 'nl' ? 'Ik vind coderen leuk' : 'I really like coding'}
          width={270} height={550} delay={0.1} onAnimationComplete={() => setAnimationsComplete((prev) => prev + 1)} />
          <Box 
          title="Links" 
          subtitle="Github linkedin email etc" 
          width={270} height={150} delay={1.1} onAnimationComplete={() => setAnimationsComplete((prev) => prev + 1)} />
        </div>
        <div className="column">
          <Box 
          title={language === 'nl' ? 'Opleiding' : 'Education'}
          subtitle="HBO-ICT 3/4 Jaar" 
          width={270} height={150} delay={0.45} onAnimationComplete={() => setAnimationsComplete((prev) => prev + 1)} />
          <Box 
          title={language === 'nl' ? 'Ervaring' : 'Experience'}
          ubtitle="Appie 2 jaar thuisbezorgd 1.5 jaar, 6 maanden stage Kadaster bla bla bla" width={270} height={550} delay={0.65} onAnimationComplete={() => setAnimationsComplete((prev) => prev + 1)} />
        </div>
        <div className="column">
          <Box 
          title={language === 'nl' ? 'Technologiëen' : 'Technologies'}
          subtitle="Javascript typescript bla bla bla" 
          width={270} height={550} delay={0.3} onAnimationComplete={() => setAnimationsComplete((prev) => prev + 1)} />
          <Box 
          title={language === 'nl' ? 'Hobbies' : 'Hobbys'}
          subtitle="Ik bench 110kg >:)" 
          width={270} height={150} delay={0.85} onAnimationComplete={() => setAnimationsComplete((prev) => prev + 1)} />
        </div>
      </div>
    </div>
  );
};

export default About;
