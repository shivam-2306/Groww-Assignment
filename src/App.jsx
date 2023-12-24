// App.js

import React, { useState, useEffect } from 'react';
import './App.css'; // Import the SCSS file
import Checkout from './Checkout/Checkout';
import ProgressBar from './ProgressBar/progressBar';
import { cInfo } from './zustand';
import axios from 'axios';
import Confirmation from './Confirmation/orderImages';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './cInfo/cInfo';
import Payment from './Payment/Payment';
import ChatComponent from './Confirmation/Confirmation';

function App() {
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCDetails = async () => {
      // Check if 'name' is not present in cInfo state
      const currentCInfo = cInfo.getState();

        try {
          const response = await axios.get(
            "https://groww-intern-assignment.vercel.app/v1/api/merchant-metadata"
          );
          var cname = response.data.merchantName;
          var logo = response.data.merchantLogo;
          var theme = {
            background: response.data.theme['--background'],
            foreground: response.data.theme['--foreground'],
            primary: response.data.theme['--primary'],
            fprimary: response.data.theme['--primary-foreground']
          };
          cInfo.setState({
            name: cname,
            logo: logo,
            theme: theme
          });
          console.log(cInfo.getState());
        } catch (error) {
          console.error("Error fetching order details:", error.message);
        } finally {
          setIsLoading(false);
        }
    };

    fetchCDetails();
  }, []);

  return (
    <Router>
      <div>
        {/* ProgressBar and CInfo components always stay on top */}
        {!isLoading && <div>
       <Header />
        <ProgressBar /> 
        {/* <CInfo /> */}
        <div className="checkout-container">
          {/* Use Routes to define your routes */}
          <Routes>
            {/* Route for /payment */}
            <Route path="/" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/chat" element={<ChatComponent />} />

            {/* Default route for / (and /checkout) */}
          </Routes>
          </div>
          </div>}
        </div>

    </Router>
  );
}

export default App;
