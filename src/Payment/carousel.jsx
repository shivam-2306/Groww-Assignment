// Carousel.js
import React, { useState, useEffect, useRef } from 'react';
import './carousel.scss'; // Ensure you have a CSS file named Carousel.css
import Cards from 'react-credit-cards-2'

const Carousel = () => {
    /*--------------------
Vars
--------------------*/
let progress = 50
let startX = 0
let active = 0
	let isDown = false
	const items = [
    {
        name: "John Smith",
        number: "**** **** **** 7048",
        expiry: "10/20",
        cvc: "737",
        issuer: "visa"
    },
    {
        name: "Emily Johnson",
        number: "**** **** **** 1564",
        expiry: "12/22",
        cvc: "452",
        issuer: "mastercard"
    },
    {
        name: "Michael Brown",
        number: "**** **** **** 8945",
        expiry: "11/23",
        cvc: "369",
        issuer: "amex"
    },
    {
        name: "Sarah Davis",
        number: "**** **** **** 0021",
        expiry: "07/24",
        cvc: "781",
        issuer: "visa"
    },
    {
        name: "William Wilson",
        number: "**** **** **** 6789",
        expiry: "08/21",
        cvc: "834",
        issuer: "discover"
    },
    {
        name: "Jessica Miller",
        number: "**** **** **** 5432",
        expiry: "05/22",
        cvc: "442",
        issuer: "mastercard"
    },
    {
        name: "David Anderson",
        number: "**** **** **** 9087",
        expiry: "02/23",
        cvc: "764",
        issuer: "visa"
		},
	{
        name: "David Anderson",
        number: "**** **** **** 9087",
        expiry: "02/23",
        cvc: "764",
        issuer: "visa"
		},
	{
        name: "David Anderson",
        number: "**** **** **** 9087",
        expiry: "02/23",
        cvc: "764",
        issuer: "visa"
		},
	{
        name: "David Anderson",
        number: "**** **** **** 9087",
        expiry: "02/23",
        cvc: "764",
        issuer: "visa"
    }
];


	const itemRefs = useRef(items.map(() => React.createRef()));
	
	let $items

	const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))


	const displayItems = (item, index, active) => {
	if($items){
  const zIndex = getZindex([...$items], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index-active)/$items.length)}
	}
	const animate = () => {
		progress = Math.max(0, Math.min(progress, 100))
		if ($items) {
			active = Math.floor(progress / 100 * (items.length - 1))
  
			$items.forEach((item, index) => displayItems(item, index, active))
		}
	}
	
	/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Handlers
--------------------*/
	const $cursors = document.querySelectorAll('.cursor')
const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel
  progress = progress + wheelProgress
  animate()
}

const handleMouseMove = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })
  }
  if (!isDown || !$items) return
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
  animate()
}

const handleMouseDown = e => {
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
  isDown = false
}

    const handleClick = (index) => {
        const newProgress = (index / items.length) * 100 + 10;
		progress = newProgress;
        // Call animate function here if needed, ensure it uses the updated state
    };
	 useEffect(() => {
        $items = itemRefs.current.map(ref => ref.current);
		animate()
    }, [itemRefs]);


	return (
	<div onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}>
			<div className="carousel">
    {items.map((item, index) => (
        <div className="carousel-item" ref={itemRefs.current[index]} key={index} onClick={handleClick(index)} >
            <div className="carousel-box">
                 <Cards
            name={item.name}
            number={item.number}
            expiry={item.expiry}
            cvc={item.cvc}
            preview={true}
            issuer={item.issuer}
          />
            </div>
        </div>
    ))}
</div>

<div className="cursor"></div>
	<div className="cursor cursor2"></div>
</div>
    );
};

export default Carousel;
