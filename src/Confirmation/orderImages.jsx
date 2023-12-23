import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Search from "../assets/search-interface-symbol.png";
import pin from "../assets/pin.png";
import phone from "../assets/phone.png";
import { orderList } from '../zustand';

const Confirmation = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        // Decreased camera.position.z value to bring the camera closer
        camera.position.z = 3;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        const createBorderTexture = (imageTexture, borderColor = 'black', borderWidth = 10) => {
            const canvas = document.createElement('canvas');
            canvas.width = imageTexture.image.width + borderWidth * 2;
            canvas.height = imageTexture.image.height + borderWidth * 2;
            const context = canvas.getContext('2d');

            // Draw border
            context.fillStyle = borderColor;
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Draw image in the center
            context.drawImage(imageTexture.image, borderWidth, borderWidth);

            return new THREE.CanvasTexture(canvas);
        };

       const imageUrls = orderListData.products.map((product) => product.image);

       const textureLoader = new THREE.TextureLoader();
        textureLoader.setCrossOrigin("Anonymous");

        const sectionCount = 6; // Adjust as needed
        const sectionMaterials = Array.from({ length: sectionCount }, (_, index) => {
            const imageUrl = imageUrls[index % imageUrls.length];
            const imageTexture = textureLoader.load(imageUrl);
            const borderedTexture = createBorderTexture(imageTexture);
            return new THREE.MeshBasicMaterial({ map: borderedTexture });
        });

        const sectionGeometries = Array.from({ length: sectionCount }, (_, index) => {
            const angle = (index / sectionCount) * Math.PI * 2;
            const x = 2 * Math.cos(angle);
            const y = 2 * Math.sin(angle);
            const z = 0;

            return new THREE.CylinderGeometry(1, 1, 2, 32, 1, true, angle, Math.PI * 2 / sectionCount);
        });

        const cylinders = sectionGeometries.map((geometry, index) => {
            const x = -2, y = 0, z = 0;
            const sectionMesh = new THREE.Mesh(geometry, sectionMaterials[index]);
            sectionMesh.position.set(x, y, z);
            scene.add(sectionMesh);
            return sectionMesh;
        });

        const animate = () => {
            requestAnimationFrame(animate);
            cylinders.forEach((cylinder) => {
                cylinder.rotation.y += 0.005;
            });
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            renderer.dispose();
            container.removeChild(renderer.domElement);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Confirmation;