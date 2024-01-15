import React, { useState, useEffect } from 'react';
import './CardDetails.scss'
import cardInfo from './cardInfo.json'
import { currStep } from '../../zustand';
import { useNavigate } from 'react-router-dom';
import Cards from "react-credit-cards-2";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils";

const CardDetails = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };
  // const [buttonsWithImages, setButtonsWithImages] = useState([]);
  //const [cardNumberError, setCardNumberError] = useState('');

  useEffect(() => {

     const cardNameInput = document.getElementById('card_name');
        const cardNameOutput = document.getElementById('name');
        const cardNumberInput = document.getElementById('card_number');
        const cardNumberOutput = document.getElementById('number');
        const cardMonthInput = document.getElementById('card_month');
        const cardMonthOutput = document.getElementById('month');
        const cardYearInput = document.getElementById('card_year');
        const cardYearOutput = document.getElementById('year');
        const cardCvcInput = document.getElementById('card_cvc');
        const cardCvcOutput = document.getElementById('cvc');
        const submitBtn = document.getElementById('submit-btn');
        const thankYou = document.querySelector('.thank-you');
        const form = document.querySelector("form");

    if(cardNameInput) cardNameInput.addEventListener('keyup', (e) => {
      let key = e.key;
      let keyLetters = key.match(/^[A-za-z ]*$/);
      if (cardNameInput.value.length === 0) {
        cardNameOutput.innerHTML = "Put your name again"
        cardNameInput.parentElement.classList.add("error-message")
        cardNameInput.classList.add("error")
      } else if (keyLetters) {
        cardNameOutput.innerHTML = cardNameInput.value.toUpperCase()
        cardNameInput.parentElement.classList.remove("error-message")
        cardNameInput.classList.remove("error")
        cardNameInput.parentElement.classList.remove("error-number")
        cardNameInput.classList.remove("error")
      } else {
        cardNameInput.parentElement.classList.add("error-number")
        cardNameInput.classList.add("error")
      }
    });

    // Number input

    if(cardNumberInput) cardNumberInput.addEventListener('keyup', (e) => {
      let key = e.key
      let keyNumbers = key.match(/^[0-9]*$/)
      if (cardNumberInput.value.length === 0) {
        cardNumberInput.parentElement.classList.add("error-message")
        cardNumberInput.classList.add('error')
        cardNumberInput.parentElement.classList.remove("error-minimum")
        cardNumberOutput.innerHTML = cardNumberInput.value
      } else if (cardNumberInput.value.length != 16) {
        cardNumberInput.parentElement.classList.add("error-minimum")
        cardNumberInput.parentElement.classList.remove('correct')
        cardNumberInput.classList.remove('correct')
        cardNumberInput.classList.remove("error")
        cardNumberOutput.innerHTML = cardNumberInput.value
      } else if (cardNumberInput.value.length === 16) {
        cardNumberInput.parentElement.classList.remove("error-minimum")
        cardNumberInput.classList.remove('error')
        cardNumberInput.parentElement.classList.remove("error-minimum")
        cardNumberInput.parentElement.classList.add('correct')
        cardNumberInput.classList.add('correct')
      } else if (keyNumbers) {
        cardNumberOutput.innerHTML = cardNumberInput.value
        cardNumberInput.classList.remove("error")
        cardNumberOutput.innerHTML = cardNumberInput.value
      } else {
        cardNumberInput.parentElement.classList.add("error-letter")
        cardNumberInput.parentElement.classList.add("error")
      }
    });

    if(cardMonthInput) cardMonthInput.addEventListener('keyup', (e) => {
      // let value = e.target.value
      if (cardMonthInput.value > 12) {
        cardMonthInput.parentElement.classList.add('month-over')
        cardMonthInput.classList.add("error")
        cardMonthInput.parentElement.classList.remove('correct')
        cardMonthInput.classList.remove('correct')
        cardMonthOutput.innerHTML = cardMonthInput.value
      } else if (cardMonthInput.value <= 12 && cardMonthInput.value.length === 2) {
        cardMonthInput.parentElement.classList.remove("error-message")
        cardMonthInput.classList.remove("error")
        cardMonthInput.parentElement.classList.remove('month-over')
        cardMonthInput.parentElement.classList.add('correct')
        cardMonthInput.classList.add('correct')
        cardMonthOutput.innerHTML = cardMonthInput.value
      } else if (cardMonthInput.value.length <= 1) {
        cardMonthInput.parentElement.classList.add("error-message")
        cardMonthInput.classList.add("error")
        cardMonthInput.parentElement.classList.remove('correct')
        cardMonthInput.classList.remove('correct')
        cardMonthOutput.innerHTML = cardMonthInput.value
      }
      else {
        cardMonthInput.parentElement.classList.remove("error-message")
        cardMonthInput.classList.remove("error")
        cardMonthInput.parentElement.classList.remove('month-over')
        cardMonthOutput.innerHTML = cardMonthInput.value
      }
    })

    if(cardYearInput) cardYearInput.addEventListener('keyup', (e) => {
      // let value = e.target.value
      if (cardYearInput.value < 23 || cardYearInput.value > 27) {
        cardYearInput.parentElement.classList.add('valid-year')
        cardYearInput.classList.add('error')
        cardYearInput.parentElement.classList.remove('correct')
        cardYearInput.classList.remove('correct')
      } else if (cardYearInput.value > 23 || cardYearInput.value < 27) {
        cardYearInput.parentElement.classList.add('correct')
        cardYearInput.classList.add('correct')
        cardYearInput.parentElement.classList.remove('valid-year')
        cardYearOutput.innerHTML = cardYearInput.value
        cardYearInput.classList.remove('error')
      } else if (cardYearInput.value.length === 0) {
        cardYearInput.parentElement.classList.remove('valid-year')
        cardYearInput.parentElement.classList.add("error-message")
      } else {
        cardYearInput.parentElement.classList.remove("error-message")
        cardYearInput.parentElement.classList.remove('valid-year')
        cardYearInput.classList.remove('error')
        cardYearOutput.innerHTML = cardYearInput.value
      }
    })

    if(cardCvcInput) cardCvcInput.addEventListener('keyup', (e) => {
      let value = e.target.value
      let valueNumbers = value.match(/^[0-9 ]*$/)
      if (value === "") {
        cardCvcInput.parentElement.classList.add("error-message")
        cardCvcInput.classList.add("error")
        cardCvcOutput.innerHTML = cardCvcInput.value
      } else if (value.length === 3) {
        cardCvcOutput.innerHTML = cardCvcInput.value
        cardCvcInput.classList.remove("error")
        cardCvcInput.parentElement.classList.add('correct')
        cardCvcInput.classList.add('correct')
      } else {
        cardCvcInput.parentElement.classList.remove("error-message")
        cardCvcInput.parentElement.classList.remove('correct')
        cardCvcInput.classList.remove('correct')
        cardCvcInput.classList.remove("error")
        cardCvcOutput.innerHTML = cardCvcInput.value
      }
    })

    // Submit form

    if(submitBtn) submitBtn.addEventListener('click', (e) => {
      if (cardNameInput.value.length === 0) {
        cardNameInput.classList.add('error')
        cardNameInput.parentElement.classList.add('error-message')
      } else {
        e.preventDefault();
        form.style.display = 'none'
        thankYou.classList.remove("hidden")
      }
      if (cardNumberInput.value.length !== 16) {
        cardNumberInput.classList.add('error')
        cardNumberInput.parentElement.classList.add('error-message')
      } else {
        e.preventDefault();
        form.style.display = 'none'
        thankYou.classList.remove("hidden")
      }
      if (cardMonthInput.value.length === 0) {
        cardMonthInput.classList.add('error')
        cardMonthInput.parentElement.classList.add('error-message')
      } else {
        e.preventDefault();
        form.style.display = 'none'
        thankYou.classList.remove("hidden")
      }
      if (cardYearInput.value.length === 0) {
        cardYearInput.classList.add('error')
        cardYearInput.parentElement.classList.add('error-message')
      } else {
        e.preventDefault();
        form.style.display = 'none'
        thankYou.classList.remove("hidden")
      }
      if (cardCvcInput.value.length !== 3) {
        cardCvcInput.classList.add('error')
        cardCvcInput.parentElement.classList.add('error-message')
      } else {
        e.preventDefault();
        form.style.display = 'none'
        thankYou.classList.remove("hidden")
      }
    })
  }, []);

   const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    
    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }
  
  //  const handleInputChange = ({ target }) => {
  //   if (target.name === "number") {
  //     target.value = formatCreditCardNumber(target.value);
  //   } else if (target.name === "expiry") {
  //     target.value = formatExpirationDate(target.value);
  //   } else if (target.name === "cvc") {
  //     target.value = formatCVC(target.value);
  //    }

  //   setState((prev) => ({ ...prev, [target.name]: target.value }));
  // };
   const handleSubmit = (e) => {
    e.preventDefault();
    const { issuer } = issuer.state;
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    setState({ formData });
    this.form.reset();
  };
  
  return (
    <div className="card-container">
      <div className="left-section">
        <div className="input-cards">
          <div className="front-card">
              <Cards className="front-card"
            number={state.number}
            name={state.name}
            expiry={state.expiry}
            cvc={state.cvc}
            focused={state.focus}
            // callback={handleCallback}
            />
            </div>
        </div>
      </div>
      <div className="right-section">
        <div className="drop"></div>
        <form>

          <div className="grid-1">
            <label>Cardholder name</label>
            <input className="c-input glass" type="text" placeholder=" Jane Appleseed" id="card_name" required name="name" value={state.name} onChange={handleInputChange}
                onFocus={handleInputFocus}/>
          </div>

          <div className="grid-2">
            <label>Card number</label>
            <input className="c-input glass" type="number" name="number" value={state.number}
             onInput={(e) => {
        if (e.target.value.length > e.target.maxLength) {
            e.target.value = e.target.value.slice(0, e.target.maxLength);
        }
    }}
    minLength={16} 
    maxLength={16} 
    placeholder="1234 5678 9123 0000" 
    id="card_number" 
                required 
                onChange={handleInputChange}
                onFocus={handleInputFocus}
/>
          </div>

          <div className="card-information">
            {/* <div id="card_date">
              <label htmlFor="card_date">Exp. Date (MM/YY)</label>
              <div className="two-inp">
                <div >
                  <input className="c-input glass" type="number"
                   onInput={(e) => {
        if (e.target.value.length > e.target.maxLength) {
            e.target.value = e.target.value.slice(0, e.target.maxLength);
        }
    }}
    placeholder="MM" 
    minLength={2} 
    maxLength={2} 
    id="card_month" 
    required 
/>
                </div>
                <div>
                  <input className="c-input glass" type="number"
                     onInput={(e) => {
        if (e.target.value.length > e.target.maxLength) {
            e.target.value = e.target.value.slice(0, e.target.maxLength);
        }
    }}
    minLength={2} 
    maxLength={2} 
    placeholder="YY" 
    id="card_year" 
    required 
/>
                </div>
              </div>
            </div> */}
              {/* <div id="card_date">
    <label htmlFor="card_date">Exp. Date (MM/YY)</label>
    <div>
        <input className="c-input glass" type="text" 
            onChange={handleInputChange}
                onFocus={handleInputFocus}
                onInput={(e) => {
        if (e.target.value.length > e.target.maxLength) {
            e.target.value = e.target.value.slice(0, e.target.maxLength);
        }
    }}
            placeholder="MM/YY" 
            id="card_expiry" 
            name='expiry'
            value={state.expiry}
            maxLength={5} 
            required 
        />
    </div>
</div> */} <div className = "grid-3">
              <label htmlFor="card_date">Exp date</label>
              <input className="c-input glass" type="text" name="expiry" value={state.expiry} onChange={handleInputChange}
                onFocus={handleInputFocus}
                onInput={(e) => {
        if (e.target.value.length > e.target.maxLength) {
            e.target.value = e.target.value.slice(0, e.target.maxLength);
        }
    }}
    maxLength={5} 
    placeholder="MM/YY" 
    id="card_expiry" 
    required 
              /> </div>
            <div className="grid-3">
              <label htmlFor="card_cvc">CVC</label>
              <input className="c-input glass" type="number" name="cvc" value={state.cvc} onChange={handleInputChange}
                onFocus={handleInputFocus}
                onInput={(e) => {
        if (e.target.value.length > e.target.maxLength) {
            e.target.value = e.target.value.slice(0, e.target.maxLength);
        }
    }}
    maxLength={3} 
    placeholder="e.g. 123" 
    id="card_cvc" 
    required 
/></div>
          </div>
          <button id="submit-btn" type="submit">Confirm</button>
        </form>
        <div className="thank-you hidden">
          <img alt="complete"/>
          <h1>Thank you!</h1>
          <p>We've added your card details</p>
          <button>Continue</button>
        </div>
      </div>
    </div>
 
    
  );
};

export default CardDetails;
