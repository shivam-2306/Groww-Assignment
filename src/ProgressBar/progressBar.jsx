import React from 'react';
import './ProgressBar.scss';
import { currStep } from '../zustand'

const steps = [
  { label: 'Checkout', icon: 'checkout-icon.png' },
  { label: 'Payment', icon: 'payment-icon.png' },
  { label: 'Confirmation', icon: 'confirmation-icon.png' },
];

const ProgressBar = () => {
  const activeStep = currStep((state) => state.Step);
  const activeIndex = steps.findIndex((step) => step.label === activeStep);

  return (
    <div className="progress-stepper">
      {steps.map((step, index) => (
        <React.Fragment key={step.label}>
          {/* Render line except for the first step */}
          {index !== 0 && <div className={`line ${index <= activeIndex ? 'before-active' : ''}`} />}
              <div className={`step ${step.label === activeStep ? 'active' : ''}`}>
            <div className="circle">
              {step.label === activeStep ? <img src={step.icon} alt={step.label} /> : null}
                  </div>
                <div className="label">{step.label}</div>
              </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBar;
