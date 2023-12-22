import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Search from "../assets/search-interface-symbol.png";
import pin from "../assets/pin.png";
import  phone  from "../assets/phone.png";

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

        const imageUrls = [
            Search, phone
            // Add more image URLs as needed
        ];

        const textureLoader = new THREE.TextureLoader();
        textureLoader.setCrossOrigin("Anonymous"); // Set crossOrigin to "Anonymous"

        const sectionCount = 6; // Set the desired number of cylinders
        const sectionMaterials = Array.from({ length: sectionCount }, (_, index) => {
            const imageUrl = imageUrls[index % imageUrls.length];
            return new THREE.MeshBasicMaterial({ map: textureLoader.load(imageUrl) });
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