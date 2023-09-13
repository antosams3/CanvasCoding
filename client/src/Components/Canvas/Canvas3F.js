import { Canvas } from "@react-three/fiber";
import * as React from 'react';
import { Suspense } from "react";
import * as THREE from 'three';
import stars from '../../Wallpaper/stars.jpg';
import { PerspectiveCamera, OrbitControls, Html, useProgress, PointerLockControls } from '@react-three/drei';
import { Scene } from './UI/Scene';
import { Floor } from "./UI/Floor";


function Loader(props) {
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const { progress } = useProgress()
    if (progress === 100) {
        props.scene.background = cubeTextureLoader.load([stars, stars, stars, stars, stars, stars]);
    }
    return (<Html center>
        <label htmlFor="progress-bar">Loading...</label>
        <progress id="progress-bar" value={progress}></progress>
    </Html>)
}


export default function Canvas3f(props) {
    let { selectObj, addMode, setSelectObj, FPView, deleteMode, setDeleteMode } = props;

    const scene = new THREE.Scene();


    return (
        <div style={{ minWidth: '300px', maxWidth: '500px', height: '500px' }}>
            <Canvas scene={scene} >
                <Suspense fallback={<Loader scene={scene} />}>
                    {/* Mouse controls */}
                    {FPView? <PointerLockControls /> : <OrbitControls />}
                    
                    {/* Plane and grids */}
                    <Floor/>
                    {addMode ? <gridHelper args={[50, 50]}></gridHelper> : ''}

                    {/* Lights and camera */}
                    <ambientLight />
                    <pointLight position={[50, 50, 50]} />
                    <PerspectiveCamera position={[-10, 30, 30]} makeDefault />

                    {/* Scene  */}
                    <Scene addMode={addMode} selectObj={selectObj} setSelectObj={setSelectObj} deleteMode={deleteMode} setDeleteMode={setDeleteMode} ></Scene>
                </Suspense>

            </Canvas>
        </div>
    )

}