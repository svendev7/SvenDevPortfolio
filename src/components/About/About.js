import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./AboutStyles.css";

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

  useEffect(() => {
    if (animationsComplete === totalBoxes) {
      setIsAnimating(false); 
    }
  }, [animationsComplete, setIsAnimating]);

  return (
    <div className="about-container">
      <div className="columns-container">
        <div className="column">
          <Box title="Professional Journey" subtitle="10+ years in digital design" width={270} height={550} delay={0.1} onAnimationComplete={() => setAnimationsComplete((prev) => prev + 1)} />
          <Box title="Awards" subtitle="15 international recognitions" width={270} height={150} delay={1.1} onAnimationComplete={() => setAnimationsComplete((prev) => prev + 1)} />
        </div>
        <div className="column">
          <Box title="Specializations" subtitle="UI/UX & Brand Strategy" width={270} height={150} delay={0.45} onAnimationComplete={() => setAnimationsComplete((prev) => prev + 1)} />
          <Box title="Portfolio" subtitle="200+ successful projects" width={270} height={550} delay={0.65} onAnimationComplete={() => setAnimationsComplete((prev) => prev + 1)} />
        </div>
        <div className="column">
          <Box title="Education" subtitle="Masters in Visual Design" width={270} height={550} delay={0.3} onAnimationComplete={() => setAnimationsComplete((prev) => prev + 1)} />
          <Box title="Clients" subtitle="50+ satisfied companies" width={270} height={150} delay={0.85} onAnimationComplete={() => setAnimationsComplete((prev) => prev + 1)} />
        </div>
      </div>
    </div>
  );
};

export default About;
