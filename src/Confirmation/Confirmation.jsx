import React, { useEffect, useRef } from 'react';
import './Confirmation.scss'; // Update this path to the location of your CSS file
import { orderList, cInfo, paymentInfo } from '../zustand';


const Confirmed = () => {
    return (
        <div className="container-text">
            <h1>Yay! your order has reached to us</h1>
            <p>
                <span className="magic">
                    <span className="magic-star">
                        <svg viewBox="0 0 512 512">
                            <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                        </svg>
                    </span>
                    <span class="magic-star">
                        <svg viewBox="0 0 512 512">
                            <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                        </svg>
                    </span>
                    <span class="magic-star">
                        <svg viewBox="0 0 512 512">
                            <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                        </svg>
                    </span>
                    <span className="magic-text">Your order has been confirmed</span>
                </span>. We are processing your order and will send you a confirmation email shortly.
            </p>
        </div>
    )
}

const Failed = () => {
    return (
        <div className="container-text">
            <h1>It looks like your payment was not processed</h1>
            <p>
                <span className="magic">
                    <span className="magic-star">
                        <svg viewBox="0 0 512 512">
                            <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                        </svg>
                    </span>
                    <span class="magic-star">
                        <svg viewBox="0 0 512 512">
                            <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                        </svg>
                    </span>
                    <span class="magic-star">
                        <svg viewBox="0 0 512 512">
                            <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                        </svg>
                    </span>
                    <span className="magic-text">The payment process was a failure</span>
                </span>. Any money deducted will be returned to you shortly. Sorry for the inconvinience.
            </p>
        </div>
    )
}

const Pending = () => {
    return (
        <div className="container-text">
            <h1>Your payment is being processed</h1>
            <p>
                <span className="magic">
                    <span className="magic-star">
                        <svg viewBox="0 0 512 512">
                            <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                        </svg>
                    </span>
                    <span class="magic-star">
                        <svg viewBox="0 0 512 512">
                            <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                        </svg>
                    </span>
                    <span class="magic-star">
                        <svg viewBox="0 0 512 512">
                            <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                        </svg>
                    </span>
                    <span className="magic-text">It is taking longer than usual to complete your checkout</span>
                </span>. We will send an email with the status shortly.
            </p>
        </div>
    )
}


const ChatComponent = () => {
    useEffect(() => {
        const messages = document.getElementsByClassName("msg");
        for (let i = 0; i < messages.length; i++) {
            setTimeout(() => messages[i].classList.add("show"), i * 1000);
        }

        let index = 0,
        interval = 1000;

const rand = (min, max) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const animate = star => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
}

for(const star of document.getElementsByClassName("magic-star")) {
  setTimeout(() => {
    animate(star);
    
    setInterval(() => animate(star), 1000);
  }, index++ * (interval / 3))
}
    }, []);
    const total = paymentInfo((state) => state.totalCost);
    const orderListData = orderList.getState();
    const imageUrls = orderListData.products.map((product) => product.image);
    const result = Math.floor(Math.random() * (5)); 
    console.log(result);

    
     let content;
    switch (result) {
        case 1:
            content = <Confirmed />;
            break;
        case 2:
            content = <Failed />;
            break;
        // ... cases for 2, 3, 4
         case 3:
            content = <Pending />;
            break;
        default:
            content = <Pending />; // Default case if needed
    }

    
    return (
        <div className="Confirmation">
        <div className="container">
            <div className="container-phone">
                <div className="phone">
                    <div className="phone-header">
                        <div className="phone-header-back">
                            <div className="phone-header-back__icon"></div>
                        </div>
                        <div className="phone-header-contact">
                            <div className="phone-header-contact__avatar">
                                <img src={cInfo((state) => state.logo)} alt="Samuel Green's Avatar" />
                            </div>
                            <div className="phone-header-contact__name">
                                <strong>{cInfo((state) => state.name)}</strong><br />
                                Your shopping spree
                            </div>
                        </div>
                        <div className="phone-header-options">
                            <div className="phone-header-options__icon"></div>
                        </div>
                    </div>
                    <div className="phone-chat">
                        <div className="phone-chat-msg__contact msg">
                            So, you have ordered products from our site. Great choice!
                        </div>
                        <div className="phone-chat-msg__contact msg">
                            Here are the products you ordered.
                        </div>
                      <div className="phone-chat-msg__pics msg">
                            {imageUrls.map((url, index) => (
                                <div 
                                    key={index} 
                                    className="phone-chat-msg__img" 
                                    style={{ backgroundImage: `url(${url})` }}
                                ></div>
                            ))}
                        </div>
                        <div className="phone-chat-msg__me msg">
                            They will be delivered to you within 1-3 days.
                        </div>
                        <div className="phone-chat-msg__me msg">Hope you enjoy them</div>
                        <div className="phone-chat-msg__contact msg">
                            Now let's talk some money. Our products may have slimmed your wallet, but they will definitely fill your heart.
                        </div>
                        <div className="msg">
                            <div className="phone-chat-offer">
                                Your total bill is<strong>{total}</strong>
                            </div>
                            <div className="phone-chat-offer">
                                You paid via <strong>$49</strong>
                            </div>
                        </div>
                    </div>
                    <div className="phone-input">
                        Type a message…
                        <div className="phone-input__btn"></div>
                    </div>
                </div>
            </div>
                <div>{content}</div>
                
            </div>
            </div>
    );
};

export default ChatComponent;
