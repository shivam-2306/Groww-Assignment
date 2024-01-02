// Carousel.js
import React, { useState, useEffect, useRef } from 'react';
import './carousel.scss'; // Ensure you have a CSS file named Carousel.css

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
        title: "Paris",
        num: "01",
        imgSrc: "https://media.istockphoto.com/id/949299844/it/foto/vista-prospettica-dellesterno-delledificio-contemporaneo.jpg?s=612x612&w=0&k=20&c=_DR1aRHuTEV3EYBJo1ZXq1pF4SgwB9EVWQLaBj4sC5g="
    },
    {
        title: "Warsaw",
        num: "02",
        imgSrc: "https://media.istockphoto.com/id/1150545984/it/foto/palazzo-moderno-di-lusso-con-piscina.jpg?s=612x612&w=0&k=20&c=Pbrai_VGc9tUviMCF1UaBErdS1YGyIVWsD29jzMZwTY="
    },
    {
        title: "Madrid",
        num: "03",
        imgSrc: "https://media.istockphoto.com/id/1214351345/it/foto/guardando-direttamente-lo-skyline-del-quartiere-finanziario-nel-centro-di-londra-immagine-di.jpg?s=612x612&w=0&k=20&c=oNNbPzPvcQ-4RA6AeatNIxHQIafBiXmDRtUUY0Ska-I="
    },
    {
        title: "Sydney",
        num: "04",
        imgSrc: "https://media.istockphoto.com/id/904390980/it/foto/foto-di-architettura-contemporanea-astratta.jpg?s=612x612&w=0&k=20&c=_P4Wmx5nq5MeDuimpNklKCBlrLovmCyd9lfiMKeJZDs="
    },
    {
        title: "Istanbul",
        num: "05",
        imgSrc: "https://media.istockphoto.com/id/130408311/it/foto/piscina-allesterno-della-casa-moderna-al-crepuscolo.jpg?s=612x612&w=0&k=20&c=ZoVjx7uDjoHKmpM1ayW6UR1SQOoYh_xx-QMG_qeOYs0="
    },
    {
        title: "Prague",
        num: "06",
        imgSrc: "https://media.istockphoto.com/id/1299954175/it/foto/villa-cubica-moderna.jpg?s=612x612&w=0&k=20&c=DhGhb3c1E3DW_fbrWJ_R_Zh0Lbwu6syFeRLsKlZ9no8="
    },
    {
        title: "Munich",
        num: "07",
        imgSrc: "https://media.istockphoto.com/id/926689776/it/foto/vista-ad-angolo-basso-dei-grattacieli-di-new-york.jpg?s=612x612&w=0&k=20&c=DmEB0Ty7ZwDnBoU5SuA8FNevOp4G1UcECw5aS4vA9A8="
    },
    {
        title: "Venice",
        num: "08",
        imgSrc: "https://media.istockphoto.com/id/1191376167/it/foto/villa-dellisola.jpg?s=612x612&w=0&k=20&c=PKslWo4FdbjinohKQlK_oWL34jqAsnzMTdy2bxEAf-I="
    },
    {
        title: "Oslo",
        num: "09",
        imgSrc: "https://media.istockphoto.com/id/184316397/it/foto/londra-edifici-aziendali.jpg?s=612x612&w=0&k=20&c=XqrRxEPzFnwRFk7PQrCiu9-FPfCTPyMe5BKKaxYXCs8="
    },
    {
        title: "London",
        num: "10",
        imgSrc: "https://media.istockphoto.com/id/184619832/it/foto/distretto-finanziario-al-crepuscolo-londra.jpg?s=612x612&w=0&k=20&c=RAThrJOBY6vhlT6-kQpu9-9jLEzWToYfdw46S8B0Mu0="
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
                <div className="title">{item.title}</div>
                <div className="num">{item.num}</div>
                <img src={item.imgSrc} alt={item.title} />
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
