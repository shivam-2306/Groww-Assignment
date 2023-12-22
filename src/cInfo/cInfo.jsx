// Header.js

import React, { useEffect } from 'react';
import './cInfo.scss';
import { cInfo } from '../zustand';

const Header = () => {
    const cname = cInfo((state) => state.name);
    const logo = cInfo((state) => state.logo);
    useEffect(() => {
        document.querySelector("#companyName").onmouseover = event => {
            const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            // event.target.innerText = letter[Math.floor(Math.random() * 26)];
        }, []
    })

  return (
    <header className="header">
      <div className="logo">
        {/* You can replace the image source with your actual logo */}
        <img src={logo} alt="Company Logo" />
      </div>
      <div className="company-name">
        {/* Replace 'Your Company' with your actual company name */}
        <h1 id="companyName">{cname}</h1>
      </div>
    </header>
  );
};

export default Header;
