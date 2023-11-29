import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
function Mythree() {
  const sceneRef = useRef();
  useEffect(() => {
    // Set up a scene
    const scene = new THREE.Scene();
    function addstar()
    {
      const geometry = new THREE.SphereGeometry(0.25,24,24);
      const material = new THREE.MeshStandardMaterial({color:0xffffff});
      const star = new THREE.Mesh(geometry,material);
      const [x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));
      star.position.set(x,y,z);
      scene.add(star);
    }
    Array(400).fill().map(addstar);

    // Set up a camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Set up a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    // Set up a cube
    let geometry = new THREE.BoxGeometry(2, 4, 5);
    
    camera.position.z = 20;
    const controls = new OrbitControls(camera, renderer.domElement);
    // cube dimension
    // const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // cube.castShadow = true; //default is false
    // cube.receiveShadow = false; //default
    // scene.add(cube);
    
    // sphere dimension
    geometry = new THREE.SphereGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00,wireframe:true });
    const sphere = new THREE.Mesh(geometry, material);
    // sphere.position.set(0,0,0);
    sphere.castShadow = true; //default is false
    sphere.receiveShadow = false; //default
    scene.add(sphere);

    // const pointlight = new THREE.PointLight(0xffffff);
    // pointlight.position.set(5,5,5);
    // pointlight.castShadow = true;
    // scene.add(pointlight);
    //Create a DirectionalLight and turn on shadows for the light
    const directional = new THREE.DirectionalLight( 0xffffff, 1 );
    directional.position.set( 5, 5, 5 ); //default; directional shining from top
    directional.castShadow = true; // default false
    scene.add( directional );
    
    //Set up shadow properties for the directional
    directional.shadow.mapSize.width = 512; // default
    directional.shadow.mapSize.height = 512; // default
    directional.shadow.camera.near = 0.5; // default
    directional.shadow.camera.far = 500; // default
    const lighthelper = new THREE.PointLightHelper(directional);
    scene.add(lighthelper);
    const light = new THREE.AmbientLight( 0x404040 ); // soft white light

    const gridhelper = new THREE.GridHelper(100,5);
    // scene.add(light,lighthelper,gridhelper);
    scene.add(light);
    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the cube
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      // Rotate the sphere
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      sphere.rotation.z += 0.01;

      // required if controls.enableDamping or controls.autoRotate are set to true
      controls.update();

      renderer.render(scene, camera);
    };

    // Start the animation
    animate();

    // Clean up on component unmount
    return () => {
      // Dispose of the cube's geometry and material
      geometry.dispose();
      material.dispose();

      // Remove the cube from the scene
      // scene.remove(cube);
      scene.remove(sphere);

      // Dispose of the renderer's domElement
      renderer.domElement.remove();

      // Dispose of the renderer
      renderer.dispose();
    };
  }, []);
  return <div ref={sceneRef} />;
}

export default Mythree;