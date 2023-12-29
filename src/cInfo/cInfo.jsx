import React, { useEffect, useRef } from 'react';
import './cInfo.scss';
import { cInfo } from '../zustand';

const Header = () => {
    const cname = cInfo((state) => state.name);
    const logo = cInfo((state) => state.logo);
    const headerRef = useRef(null);


   useEffect(() => {
    let debounceTimer;
    const header = headerRef.current;

    const handleScroll = () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            if (window.scrollY) {
                header.classList.add("sticking");
            } else {
                header.classList.remove("sticking");
            }
        }, 5); // 100ms debounce time
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(debounceTimer);
    };
}, []);// Empty dependency array ensures this effect runs only once

    useEffect(() => {
        const companyNameElement = document.querySelector("#companyName");

        if (companyNameElement) {
            const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const originalText = companyNameElement.innerText;


            let it = 0;
            const int = setInterval(() => {
                companyNameElement.innerText = originalText.split("")
                    .map((letter, index) => {
                        if (index < it) {
                            return cname[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    }).join("");

                if (it > 9) clearInterval(int);
                it += 1 / 5;
            }, 50);

            return () => {
                clearInterval(int);
            };
        }
    }, [cname]); // Include cname in the dependency array to react to changes in cname
    

    return (
        <header className="header glass" ref={headerRef}>
            <div className="logo">
                {/* You can replace the image source with your actual logo */}
                <img src={logo} alt="Company Logo" />
            </div>
            <div className="company-name">
                {/* Add an ID or class to the specific h1 element */}
                <h1 id="companyName">{cname}</h1>
            </div>
        </header>
    );
};

export default Header;
