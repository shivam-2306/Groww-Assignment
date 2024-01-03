import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Payment.scss';
import axios from 'axios';
import {motion} from 'framer-motion'
import Left from './Left';
import { currStep } from '../zustand'


const Payment = () => {
  const navigate = useNavigate();
  const [isExpanded, setExpanded] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const toggleExpand = () => {
    setExpanded(!isExpanded);
  };
 const front = '>';
 const back = '<';
  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        const response = await axios.get(
          'https://groww-intern-assignment.vercel.app/v1/api/order-details'
        );
        setProductImages(response.data.products.map((product) => product.image));
      } catch (error) {
        console.error('Error fetching product images:', error.message);
      }
    };

    fetchProductImages();
  }, []);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + productImages.length) % productImages.length
    );
  };
  const handleNavigation = () => {
     currStep.setState({ Step: 'Confirmation' })
    navigate('/chat')
  };

  return (
    <motion.div className="p_wrapper">
      <div className="left"><Left/></div>
      <motion.div className="right">
        <motion.div className="right__wrapper">
          <motion.div className="P_header">
            <h3>Cart Summary</h3>
            <button onClick={toggleExpand}>Expand</button>
          </motion.div>
          {isExpanded && (
            <motion.div className="expanded__List">
              <motion.div className="product__Images">
              <motion.button onClick={handlePrevImage} whileHover={{scale:1.2}} whileTap={{scale:0.8}}> {back} </motion.button>
                   <img
    src={productImages[currentImageIndex]}
    alt={`Product ${currentImageIndex + 1}`}
    className="visible"
  />
                <motion.button onClick={handleNextImage} whileHover={{scale:1.2}} whileTap={{scale:0.8}}> {front} </motion.button>
              </motion.div>
            
            </motion.div>
          )}

          <hr />

          <div className="mid__elements">
            <h4>Item Subtotal: </h4>
            <span>$4445</span>
          </div>

          <div className="mid__elements">
            <h4>Shipping: </h4>
            <span>FREE</span>
          </div>

          <div className="mid__elements">
            <h4>Tax Value: </h4>
            <span>$55</span>
          </div>

          <hr />

          <div className="mid__elements">
            <h4>Total: </h4>
            <span>$4500</span>
          </div>

          <div className="mid__elements">
            <h4>You Save: </h4>
            <span>$500</span>
          </div>
          <motion.button onClick={handleNavigation} whileHover={{rotate: 6}} whileTap={{scale:0.8}}> Confirm Payment </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Payment;
