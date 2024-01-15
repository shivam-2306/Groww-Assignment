
import "./Checkout.scss";
import React, { useEffect, useState } from "react";
import axios from "axios"
import {motion} from 'framer-motion'
import Search from "../assets/search-interface-symbol.png";
import { currStep, paymentInfo } from "../zustand";
import { useNavigate } from "react-router-dom";
import { orderList } from '../zustand'
import chroma from "chroma-js";
import { IonIcon } from "@ionic/react";
import { cart, call, pin } from 'ionicons/icons';

const Checkout = () => {
  const navigate = useNavigate();
  
  const [orderDetails, setOrderDetails] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
   const [promoCode, setPromoCode] = useState('');
  const [promoCodeStatus, setPromoCodeStatus] = useState('');

const SetColor = () => { const root = document.documentElement;
const styles = getComputedStyle(root);
  var primaryColor = styles.getPropertyValue('--primary').trim();
  if (primaryColor) {
    primaryColor = chroma(primaryColor);
    let LighterColor = primaryColor.brighten(1).css(); // slightly brighter
    let DarkerColor = primaryColor.darken(1).css(); // slightly darker
    //let muchDarkerColor = primaryColor.darken(3).css();
    // Set new shades as CSS variables
    document.documentElement.style.setProperty('--primary-lighter', LighterColor);
    //document.documentElement.style.setProperty('--primary-much-lighter', muchLighterColor);
    document.documentElement.style.setProperty('--primary-darker', DarkerColor);
    //document.documentElement.style.setProperty('--primary-much-darker', muchDarkerColor);}
  }
  }
  

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
    currStep.setState({ Step: 'Payment' })
    navigate('/payment')
  
  }



   useEffect(() => {
     // Get the value of orderList
     SetColor();
    const orderListData = orderList.getState();

    // Check if orderListData is not empty
    if (orderListData.products) {
      // Set orderDetails to the value of orderListData
      setOrderDetails(orderListData);
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
      backgroundColor: 'var(--primary)',
      color:'var(--primary-foreground)', // Background color on hover
    },
    tap: {
      scale: 0.99,
      borderColor: 'var(--primary-foreground)',
        backgroundColor:'var(--primary)',// Background color on tap/click
    },
  };
  // Calculate total cost based on the quantity and price of each product
  const totalCost = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const totalCount = products.reduce(
    (count, product) => count + product.quantity,
    0
  );
  
  paymentInfo.setState({ totalCost: (totalCost + 5.99).toFixed(2), paymentMethod: 'null' })

  const handleOnMouseMove = (e) => {
    for (const product of document.querySelectorAll('.productWrapper')) {
      const rect = product.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      product.style.setProperty('--x', `${x}px`);
      product.style.setProperty('--y', `${y}px`);
    }

  }

  return (
    <motion.div className="wrapper">
      
      <motion.div className="orderSummary">
        <div className="orderList" onMouseMove={(event)=>(handleOnMouseMove(event))}>
          <div className="icon">
            <IonIcon icon={cart} style= {{color: 'var(--foreground)', position: 'relative', fontSize:'5em'}} />
        </div>
        {products.length === 0 ? (
            <div className="Empty" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column' , gap:20}}>
            <h2>Oops! Your Cart seems to be empty!!</h2>
            <img src={Search} alt="Search" style={{ width: 100, height: 100 }} />
          </div>
          
          ) : (
              <div>
          <ul>
            {products.map((product) => (
                
                  
              <div className="productWrapper" >
                <div className="product-border"></div>
                <div className="product-content">
                  <div className="image-wrapper"><img
                    src={product.image}
                    alt={product.title}
                  /></div>
                  <p className="Title">
                      <b>{product.title}</b>
                      <br />
                      Price: ${product.price}
                      <br />
                      Product ID: {product.id}
                    </p>
                  <div className="quantity">
                    <motion.button 
                    variants={Variants}
                    className="glass"
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
                    className="glass"
                      variants={Variants}
                      
                      onClick={() =>
                        handleQuantityChange(product.id, product.quantity + 1)
                      }
                      whileTap="tap"
                      whileHover="hover"
                    >
                      +
                    </motion.button>
                  </div>
                  </div>
                </div>
              
            
            ))}
              
          </ul>
          </div>)}
        </div>
        
        <motion.div className="totalCost">
          <h2>Detailed Summary</h2>
          <div className="phone-screen" style={{ display: 'flex', alignItems: 'center',  gap:20}}>
            <IonIcon icon={pin} style={{height:20, width:20, marginRight:-10, color: 'var(--primary-foreground'}}/>
            <input className ="input" type="text" placeholder="+91 - " style={{background:"transparent", fontSize:18, color:'black', outline:"none", border:"none",borderBottom:'1px solid #00b386', paddingBottom:5, letterSpacing:1.5, width:130}} onChange={handlePhoneNumberChange} onKeyDown={handleEnterKeyPress}/>
          </div>
          <div className="phone-screen" style={{ display: 'flex', alignItems: 'center',  gap:20}}>
            <IonIcon icon={call} alt="phone" style={{height:20, width:20, marginRight:-10}}/>
            <input className ="input" type="text" placeholder="+91 - " style={{background:"transparent", fontSize:18, color:'black', outline:"none", border:"none",borderBottom:'1px solid #00b386', paddingBottom:5, letterSpacing:1.5, width:130}} onChange={handlePhoneNumberChange} onKeyDown={handleEnterKeyPress}/>
          </div>
      {phoneNumberError && <div style={{ color: phoneNumberError.includes('added') ? 'green' : 'red' , fontWeight: 'bold'}}>{phoneNumberError}</div>}
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
      {promoCodeStatus && <div style={{ color: promoCodeStatus.includes('Invalid') ? 'red' : 'green', fontWeight: 'bold' }}>{promoCodeStatus}</div>}

          <div className="Grandtotal" >
            <h4>Grand total ({totalCount} items): </h4>
            <span>$ {(totalCost + 5.99).toFixed(2)}</span>
          </div>
          <motion.button className="proceed glass" whileHover={{scale:1.02}} whileTap={{scale:0.99}} onClick ={handleTransition}>
              Proceed to buy
          </motion.button>
        </motion.div>
       </motion.div>
    

    
    </motion.div>
  );
};

export default Checkout;