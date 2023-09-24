import { Canvas } from "@react-three/fiber";
import * as React from 'react';
import { Suspense } from "react";
import * as THREE from 'three';
import stars from '../../Wallpaper/stars.jpg';
import { PerspectiveCamera, OrbitControls, Html, useProgress, PointerLockControls } from '@react-three/drei';
import { Scene } from './UI/Scene';
import { Floor } from "./UI/Floor";


function Loader(props) {
    const {setLoading} = props;
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const { progress } = useProgress()
    if (progress === 100) {
        props.scene.background = cubeTextureLoader.load([stars, stars, stars, stars, stars, stars]);
        setLoading(false);              // Code Editor loading = false
    }
    return (<Html center>
        <label htmlFor="progress-bar">Loading...</label>
        <progress id="progress-bar" value={progress}></progress>
    </Html>)
}


export default function Canvas3f(props) {
    let { selectObj, setSelectObj, FPView, mode, setMode, setLoading , objects, setObjects, setAddType, addType} = props;

    const scene = new THREE.Scene();


    return (
        <div style={{ minWidth: '300px', maxWidth: '500px', height: '500px' }}>
            <Canvas scene={scene} >
                <Suspense fallback={<Loader scene={scene} setLoading={setLoading} />}>
                    {/* Mouse controls */}
                    {FPView ? <PointerLockControls /> : <OrbitControls />}

                    {/* Plane and grids */}
                    <Floor />
                    {(mode === 'ADD' || mode === 'MOVE') ? <gridHelper args={[50, 50]}></gridHelper> : ''}

                    {/* Lights and camera */}
                    <ambientLight />
                    <pointLight position={[50, 50, 50]} />
                    <PerspectiveCamera position={[-10, 30, 30]} makeDefault />

                    {/* Scene  */}
                    <Scene mode={mode} setMode={setMode} selectObj={selectObj} setSelectObj={setSelectObj} setAddType={setAddType} addType={addType} objects={objects} setObjects={setObjects} ></Scene>
                </Suspense>

            </Canvas>
        </div>
    )

}