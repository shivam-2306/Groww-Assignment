import React from 'react';
import './progressBar.scss';
import { motion } from 'framer-motion';
import { currStep } from '../zustand'
import { IonIcon } from '@ionic/react';
import {card, cart, bagCheck} from 'ionicons/icons'

const steps = [
  { label: 'Checkout', icon: cart },
  { label: 'Payment', icon: card },
  { label: 'Confirmation', icon: bagCheck},
];

const ProgressBar = () => {
  const activeStep = currStep((state) => state.Step);
  const activeIndex = steps.findIndex((step) => step.label === activeStep);

  // Animation for the progress line (black line)
  const progressLineAnimation = {
    inactive: { 
      scaleX: 0,
      transformOrigin: 'left',
      transition: { duration: 1 }
    },
    active: { 
      scaleX: 1,
      transformOrigin: 'left',
      transition: { duration: 1 }
    },
  };

  // Animation for the circle
  const circleAnimation = (index) => ( {
    inactive: { 
      scale: 0.83, 
      borderColor:index < activeIndex ? 'var(--primary)' : 'var(--foreground)',
      transition: { duration: 1 } // Slowed down transition
    },
    active: { 
      scale: 1.2, // Slightly larger to give a bold effect
      borderColor: 'var(--primary-foreground)', 
      transition: { type: 'spring', stiffness: 100,damping: 5,  duration: 1, delay: index==0 ? 0 : 1 } // Slowed down transition
    },
  });

  // Animation for the label
  const labelAnimation = (index) => ({
    inactive: { 
      color:index < activeIndex ? 'var(--primary)' : 'var(--foreground)', 
      fontWeight: 'normal',
      fontSize: '0.8rem',
      transition: { duration: 1 } // Slowed down transition
    },
    active: { 
      color: 'var(--primary)', 
      fontWeight: 'bold',
      fontSize: '1rem',
      transition: { duration: 1 , delay: index==0 ? 0 : 1} // Slowed down transition
    },
  });

  return (
  <div className="progress-stepper">
    {steps.map((step, index) => (
      <React.Fragment key={step.label}>
        {/* Line wrapper */}
        {index !== 0 && (
          <div className="line-wrapper">
            {/* Static grey line as a base */}
            <div className="base-line" />
            
            {/* Animated progress line */}
            <motion.div
              className="progress-line"
              variants={progressLineAnimation}
              initial="inactive"
              animate={index <= activeIndex ? 'active' : 'inactive'}
            />
          </div>
        )}
        <div className={`step ${step.label === activeStep ? 'active' : ''}`}>
          <motion.div className="circle"
            variants={circleAnimation(index)}
            initial="inactive"
            animate={step.label === activeStep ? 'active' : 'inactive'}>
            {step.label === activeStep ? <IonIcon icon={step.icon} style={{color:'var(--primary-foreground)', fontSize:'2em' }} /> : null}
          </motion.div>
          <motion.div className="label"
            variants={labelAnimation(index)}
            initial="inactive"
            animate={step.label === activeStep ? 'active' : 'inactive'}>
            {step.label}
          </motion.div>
        </div>
      </React.Fragment>
    ))}
      </div>

  );
};

export default ProgressBar;
