import React, { useEffect } from 'react';
import './Confirmation.scss'; // Update this path to the location of your CSS file

const ChatComponent = () => {
    useEffect(() => {
        const messages = document.getElementsByClassName("msg");
        for (let i = 0; i < messages.length; i++) {
            setTimeout(() => messages[i].classList.add("show"), i * 1000);
        }
    }, []);

    return (
        <div className="container">
            <div className="container-phone">
                <div className="phone">
                    <div className="phone-header">
                        <div className="phone-header-back">
                            <div className="phone-header-back__icon"></div>
                        </div>
                        <div className="phone-header-contact">
                            <div className="phone-header-contact__avatar">
                                <img src="https://github.com/Timothy1982/chat-app-css-illustration/raw/master/images/avatar.jpg" alt="Samuel Green's Avatar" />
                            </div>
                            <div className="phone-header-contact__name">
                                <strong>Samuel Green</strong><br />
                                Available to Walk
                            </div>
                        </div>
                        <div className="phone-header-options">
                            <div className="phone-header-options__icon"></div>
                        </div>
                    </div>
                    <div className="phone-chat">
                        <div className="phone-chat-msg__contact msg">
                            That sounds great. I’d be happy with that.
                        </div>
                        <div className="phone-chat-msg__contact msg">
                            Could you send over some pictures of your dog, please?
                        </div>
                        <div className="phone-chat-msg__pics msg">
                            <div className="phone-chat-msg__img"></div>
                            <div className="phone-chat-msg__img"></div>
                            <div className="phone-chat-msg__img"></div>
                        </div>
                        <div className="phone-chat-msg__me msg">
                            Here are a few pictures. She’s a happy girl!
                        </div>
                        <div className="phone-chat-msg__me msg">Can you make it?</div>
                        <div className="phone-chat-msg__contact msg">
                            She looks so happy! The time we discussed works. How long shall I take her out for?
                        </div>
                        <div className="msg">
                            <div className="phone-chat-offer">
                                30 minute walk <strong>$29</strong>
                            </div>
                            <div className="phone-chat-offer">
                                1 hour walk <strong>$49</strong>
                            </div>
                        </div>
                    </div>
                    <div className="phone-input">
                        Type a message…
                        <div className="phone-input__btn"></div>
                    </div>
                </div>
            </div>
            <div className="container-text">
                <h1>Simple booking</h1>
                <p>
                    Stay in touch with our dog walkers through the chat interface. This
                    makes it easy to discuss arrangements and make bookings. Once the walk
                    has been completed you can rate your walker and book again all through
                    the chat.
                </p>
            </div>
            </div>
    );
};

export default ChatComponent;
