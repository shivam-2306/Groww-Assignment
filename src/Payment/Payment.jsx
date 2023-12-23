
import "./Payment.scss";
import React, { useEffect, useState } from "react";
import axios from "axios"
import {motion} from 'framer-motion'
import Search from "../assets/search-interface-symbol.png";
import pin from "../assets/pin.png";
import  phone  from "../assets/phone.png";
import { Card } from "@mui/material";
import { currStep } from "../zustand";
import { useNavigate } from "react-router-dom";
import {orderList} from '../zustand'


const Payment = () => {
  const navigate = useNavigate();
  
  const [orderDetails, setOrderDetails] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
   const [promoCode, setPromoCode] = useState('');
  const [promoCodeStatus, setPromoCodeStatus] = useState('');

  const handlePromoCodeChange = (event) => {
    const inputPromoCode = event.target.value;
    setPromoCode(inputPromoCode);
    setPromoCodeStatus('');
  };

  const applyPromoCode = (event) => {
    // Simulate a random result for demonstration purposes
    if (event.key === 'Enter') {
      //add a get request here
      const isCodeValid = Math.random() < 0.5; // Adjust the threshold as needed

    if (isCodeValid) {
      setPromoCodeStatus('Code applied successfully!');
    } else {
      setPromoCodeStatus('Invalid promo code. Please try again.');
    }}
  };

  const handlePhoneNumberChange = (event) => {
    const inputPhoneNumber = event.target.value;

    // Your phone number validation logic here
    // For simplicity, this example checks if the entered value is a numeric string
    const isValidPhoneNumber = /^\d+$/.test(inputPhoneNumber);

    if (isValidPhoneNumber || inputPhoneNumber === '') {
      setPhoneNumber(inputPhoneNumber);
      setPhoneNumberError('');
    } else {
      setPhoneNumberError('Please enter a valid phone number');
    }
  };

  const handleEnterKeyPress = (event) => {
    // Check if the pressed key is "Enter" (key code 13)
    if (event.key === 'Enter') {
      // Check length after pressing Enter
      if (phoneNumber.length !== 10) {
        setPhoneNumberError('Phone number must be 10 digits');
      } else {
        setPhoneNumberError('Phone number added!');
      }
    }
  };

  const handleTransition = (event) => {
    currStep.setState({ Step: 'Confirmation' })
    navigate('/confirmation')
  
  }

   useEffect(() => {
    // Get the value of orderList
    const orderListData = orderList.getState();

    // Check if orderListData is not empty
    if (orderListData.products) {
      // Set orderDetails to the value of orderListData
      setOrderDetails(orderListData);
      console.log('this is stored'); console.table(orderListData)
    } else {
      // If it's empty, fetch data from the API
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.get(
            "https://groww-intern-assignment.vercel.app/v1/api/order-details"
          );

          // Set the fetched data to orderDetails
          setOrderDetails(response.data);
          orderList.setState(response.data);
          console.log('this is set'); console.table(orderList.getState())
          
        } catch (error) {
          console.error("Error fetching order details:", error.message);
        }
      };

      // Call the fetchOrderDetails function to initiate the fetch
      fetchOrderDetails();
    }
  }, []);


  const handleQuantityChange = (productId, newQuantity) => {
    newQuantity = Math.max(0, newQuantity);
    setOrderDetails((prevOrderDetails) => ({
      ...prevOrderDetails,
      products: prevOrderDetails.products.map((product) =>
        product.id === productId
          ? { ...product, quantity: newQuantity }
          : product
      ),
    }));
  };


  if (!orderDetails) {
    return <div></div>;
  }

  const { products } = orderDetails;
  const Variants = {
    hover: {
      scale:1.05,
      backgroundColor:'#00b386',
      color:'white', // Background color on hover
    },
    tap: {
        scale:0.99,
        backgroundColor:'#00b386',// Background color on tap/click
    },
  };
  const CardVar = {
    hover: {
        boxShadow: '0 4px 8px 0 rgba(0, 179, 134, 0.2), 0 6px 20px 0 rgba(0, 179, 134, 0.19)',
        scale:1.01,
      },
  }
  // Calculate total cost based on the quantity and price of each product
  const totalCost = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const totalCount = products.reduce(
    (count, product) => count + product.quantity,
    0
  );

  return (
    <motion.div className="wrapper">
      <h1>Shopping Cart</h1>
      <hr />
      
      <motion.div className="orderSummary">
        <div className="orderList">
        <h2>Order Summary</h2>
        {products.length === 0 ? (
            <div className="Empty" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column' , gap:20}}>
            <h2>Oops! Your Cart seems to be empty!!</h2>
            <img src={Search} alt="Search" style={{ width: 100, height: 100 }} />
          </div>
          
    ) : (
          <ul>
            {products.map((product) => (
                
                  
                <motion.div className="productWrapper" variants={CardVar} whileHover="hover" key={product.id}>
                  <img
                    src={product.image}
                    alt={product.title}
                  />
                  <p className="Title">
                      <b>{product.title}</b>
                      <br />
                      Price: ${product.price}
                      <br />
                      Product ID: {product.id}
                    </p>
                  <motion.div className="quantity">
                    <motion.button 
                    variants={Variants}
                      onClick={() =>
                        handleQuantityChange(product.id, product.quantity - 1)
                      }
                      whileTap="tap"
                      whileHover="hover"
                    >
                      -
                    </motion.button>
                    <span>{product.quantity}</span>
                    <motion.button
                        variants={Variants}
                      onClick={() =>
                        handleQuantityChange(product.id, product.quantity + 1)
                      }
                      whileTap="tap"
                      whileHover="hover"
                    >
                      +
                    </motion.button>
                  </motion.div>
                </motion.div>
              
            
            ))}
              
          </ul>)}
        </div>
        
        <motion.div className="totalCost">
          <h2>Detailed Summary</h2>
          <div className="phone" style={{ display: 'flex', alignItems: 'center',  gap:20}}>
            <img href={pin} alt="phone" style={{height:20, width:20, marginRight:-10}}/>
            <input className ="input" type="text" placeholder="+91 - " style={{background:"transparent", fontSize:18, color:'black', outline:"none", border:"none",borderBottom:'1px solid #00b386', paddingBottom:5, letterSpacing:1.5, width:130}} onChange={handlePhoneNumberChange} onKeyDown={handleEnterKeyPress}/>
          </div>
          <div className="phone" style={{ display: 'flex', alignItems: 'center',  gap:20}}>
            <img src={phone} alt="phone" style={{height:20, width:20, marginRight:-10}}/>
            <input className ="input" type="text" placeholder="+91 - " style={{background:"transparent", fontSize:18, color:'black', outline:"none", border:"none",borderBottom:'1px solid #00b386', paddingBottom:5, letterSpacing:1.5, width:130}} onChange={handlePhoneNumberChange} onKeyDown={handleEnterKeyPress}/>
          </div>
      {phoneNumberError && <div style={{ color: phoneNumberError.includes('added') ? 'green' : 'red' }}>{phoneNumberError}</div>}
          <div className="subtotal">
            <h4>Cart total: </h4>
            <span>$ {totalCost.toFixed(2)}</span>
          </div>
          <div className="shipping">
            <h4>Shipping Cost:</h4>
            <span>$ 5.99</span>
          </div>
          <div className="promo">
          <h4>#Promo: </h4>
           
             <input type="search" id="promoCode" className="promoInput" placeholder="Promo code" style={{letterSpacing:1}} value={promoCode}
          onChange={handlePromoCodeChange} onKeyDown={applyPromoCode}/></div>
      {promoCodeStatus && <div style={{ color: promoCodeStatus.includes('Invalid') ? 'red' : 'green' }}>{promoCodeStatus}</div>}

          <div className="Grandtotal" >
            <h4>Grand total ({totalCount} items): </h4>
            <span>$ {(totalCost + 5.99).toFixed(2)}</span>
          </div>
          <motion.button className="proceed" whileHover={{scale:1.02}} whileTap={{scale:0.99}} onClick ={handleTransition}>
              Proceed to buy
          </motion.button>
        </motion.div>
       </motion.div>
    

    
    </motion.div>
  );
};

export default Payment;