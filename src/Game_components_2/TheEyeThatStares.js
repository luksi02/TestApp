import React, { useRef, useEffect, useState } from "react";
import * as THREE from 'three';

const TheEyeThatStares = () => {
    const eyeRef = useRef(null);
    const [eyePosition, setEyePosition] = useState({x :0, y: 0});

    const handleMouseMove = (event) => {
        console.log("mouse moved!")
        const x = event.clientX;
        const y = event.clientY;
        setEyePosition({x, y});
    };

    useEffect(() => {
        console.log("mouse moved, used effect")
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {

        if (!eyeRef.current) {
            return;
        }

        const eye = eyeRef.current;
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(renderer.domElement);

        const geometry = new THREE.SphereGeometry(10, 32, 32);
        const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xffffff }));

        scene.add(mesh);

        camera.position.set(0, 0, 50); // Set camera position to fixed position at the top of the page

        const animate = () => {
            requestAnimationFrame(animate);

            const gaze = new THREE.Vector3(
                (eyePosition.x / window.innerWidth) * 2 - 1, // Calculate normalized device coordinates
                -(eyePosition.y / window.innerHeight) * 2 + 1,
                0.5
            );

            gaze.unproject(camera); // Convert normalized device coordinates to world coordinates

            mesh.lookAt(gaze); // Set the mesh to look at the calculated gaze direction

            const hue = (Date.now() / 1000) % 1;

            mesh.material.color.setHSL(hue, 1, 0.5);

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            document.body.removeChild(renderer.domElement);
        };
}, [eyePosition]);

    // useEffect(() => {
    //
    //     if (!eyeRef.current) {
    //         return;
    //     }
    //
    //     const eye = eyeRef.current;
    //     const renderer = new THREE.WebGLRenderer({ alpha: true });
    //     const scene = new THREE.Scene();
    //     const camera = new THREE.PerspectiveCamera(
    //         45, eye.offsetWidth / eye.offsetHeight, 0.1, 1000);
    //
    //     renderer.setSize(eye.offsetWidth, eye.offsetHeight);
    //
    //     eye.appendChild(renderer.domElement);
    //
    //     const geometry = new THREE.SphereGeometry(10, 32, 32);
    //     const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    //     const mesh = new THREE.Mesh(geometry, material);
    //
    //     scene.add(mesh);
    //
    //     camera.position.z = 50;
    //
    //     const animate = () => {
    //         requestAnimationFrame(animate);
    //
    //         const hue = (Date.now() /1000) % 1;
    //         const saturation = (Date.now() /1000) % 1;
    //         const lightness = (Date.now() /1000) % 1;
    //
    //         mesh.material.color.setHSL(hue, saturation, lightness);
    //
    //         mesh.position.x = eyePosition.x / 20 - 2.5;
    //         mesh.position.y = -eyePosition.y / 20 + 2.5;
    //
    //         renderer.render(scene, camera);
    //     };
    //
    //     animate();
    //
    //     return () => {
    //         eye.removeChild(renderer.domElement);
    //     };
    // }, [eyePosition, eyeRef]);

    return (
        <div>
            <p>The Eye sees you!</p>
            <p>{eyePosition.x}  -  x </p>
            <p>{eyePosition.y}  -  y </p>

        <div className='eye' ref={eyeRef} style={{ width: '200px', height: '200px', position: 'relative'}}>

            {/*<div className='eyeball' style={{transform: `translate(${eyePosition.x}px, ${eyePosition.y}px` }} />*/}
        </div>
    </div>
    );
};

export default TheEyeThatStares;
