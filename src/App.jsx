import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Checkout from './Checkout/Checkout'
import ProgressBar from './ProgressBar/progressBar'
import { cInfo } from './zustand'
import axios from 'axios'
import Confirmation from './Confirmation/Confirmation'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './cInfo/cInfo'

function App() {
  const [count, setCount] = useState(0)
  const [progress, setProgress] = useState(0);
  

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          "https://groww-intern-assignment.vercel.app/v1/api/merchant-metadata"
        );
        var cname= response.data.merchantName; 
        var logo = response.data.merchantLogo;
        var theme = {
          background: response.data.theme['--background'],
          foreground: response.data.theme['--foreground'],
          primary: response.data.theme['--primary'],
          fprimary: response.data.theme['--primary-foreground']
        }
        cInfo.setState({
          name: cname,
          logo: logo,
          theme: theme
        })
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error.message);
      }
    };

    fetchOrderDetails();
  }, []);

  return (
    <Router>
      <div>
        {/* ProgressBar and CInfo components always stay on top */}
          <Header />
          <ProgressBar  />
        {/* <CInfo /> */}

        {/* Use Routes to define your routes */}
        <Routes>
          {/* Route for /payment */}
                    <Route path="/" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />

          {/* Default route for / (and /checkout) */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
