// import './Left.scss'


// const Left = () => {
//   return (
//     <div className="left__wrapper">
//         <h2> Payment Method </h2>
//        <div className="header__cards">
           
//            <div className="payment__type">
//             UPI
//            </div>
//            <div className="payment__type">
//             Card
//            </div>
//        </div>
//     </div>
//   )
// }

// export default Left


import React, { useState } from 'react';
import './Left.scss';
import CardDetails from './Billing/CardDetails';
import UPI from './Billing/UPI';

const Left = () => {
  const [selectedOption, setSelectedOption] = useState('upi');
    
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="left__wrapper">
      <h2> Payment Method </h2>
      <div className="header__cards">
        <div className={`payment__type ${selectedOption === 'upi' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="paymentMethod"
            id="upiRadio"
            checked={selectedOption === 'upi'}
            onChange={() => handleOptionChange('upi')}
          />
          <label htmlFor="upiRadio">UPI</label>
        </div>
        <div className={`payment__type ${selectedOption === 'card' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="paymentMethod"
            id="cardRadio"
            checked={selectedOption === 'card'}
            onChange={() => handleOptionChange('card')}
          />
          <label htmlFor="cardRadio">Card</label>
        </div>
      </div>
      
      {selectedOption === 'upi' && (
        // Render content for UPI payment
        <UPI/>
      )}
      {selectedOption === 'card' && (
        // Render content for Card payment
        <CardDetails />
      )}
    </div>
  );
};

export default Left;

