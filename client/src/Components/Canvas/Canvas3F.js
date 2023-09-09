import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as React from 'react';
import { Suspense } from "react";
import * as THREE from 'three';
import * as dat from 'dat.gui';
import stars from '../../Wallpaper/stars.jpg';
import { DogModel, CatModel, RabbitModel } from "./Models/Animals";
import { usePlane, useGLTF, PerspectiveCamera, OrbitControls, useAnimations, Html, useProgress } from '@react-three/drei';

import { Vector2 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


function Box(props) {
    const { addMode } = props;     // This reference will give us direct access to the mesh
    const meshRef = React.useRef()    // Set up state for the hovered and active state

    const [hovered, setHover] = React.useState(false)
    const [active, setActive] = React.useState(false)

    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (meshRef.current.rotation.x += delta))

    // Return view, these are regular three.js elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={addMode ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

function Sphere(props) {
    const { size, addMode } = props;     // This reference will give us direct access to the mesh
    const meshRef = React.useRef()    // Set up state for the hovered and active state

    const [hovered, setHover] = React.useState(false)
    const [active, setActive] = React.useState(false)
    const [step, setStep] = React.useState(0)
    const [options, setOptions] = React.useState({
        sphereColor: 0xff0,
        sphereWireframe: false,
        sphereSpeed: 0.01
    })

    React.useEffect(() => {
        const gui = new dat.GUI();

        gui.addColor(options, 'sphereColor').onChange(function (e) {
            meshRef.current.material.color.set(e);
        })

        gui.add(options, 'sphereWireframe').onChange(function (e) {
            meshRef.current.material.wireframe = e;
        })

        gui.add(options, 'sphereSpeed', 0, 0.1); // Define min value o and maxValue 0.1
    }, []);


    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame(() => {
        // Aggiorna la posizione verticale della sfera per ottenere l'effetto di rimbalzo
        setStep(step + options.sphereSpeed)

        // Aggiorna la posizione del mesh in base alla nuova posizione verticale
        if (meshRef.current) {
            meshRef.current.position.y = 10 * Math.abs(Math.sin(step)) + 2;
        }
    });

    // Return view, these are regular three.js elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <sphereGeometry args={[size[0], size[1], size[2]]} />
            <meshStandardMaterial color={addMode ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

function Scene(props) {
    const { addMode, selectObj, setSelectObj } = props;
    const canvasRef = React.useRef();
    const [mousePosition, setMousePosition] = React.useState(new THREE.Vector2());
    const [intersectionPoint, setIntersectionPoint] = React.useState(new THREE.Vector3());
    const [objects, setObjects] = React.useState([]);

    const handleClick = () => {
        if (addMode) {
            if (selectObj[0] === 'BOX' || selectObj[0] === 'SPHERE') {
                setObjects([...objects, selectObj[0]]);
                setSelectObj([]);
            }
        }
    }

    React.useEffect(() => {
        // Configura il raycaster e altri eventi come nel tuo codice Three.js originale.

        // Aggiungi event listener per mousemove, ecc.
        window.addEventListener('click', handleClick);

        return () => {
            // Rimuovi gli event listener quando il componente viene smontato.
            window.removeEventListener('click', handleClick);
        };
    }, [addMode, selectObj]);


    useFrame(() => {
        // Qui puoi eseguire l'animazione e l'aggiornamento della scena utilizzando useFrame di R3F.
    });

    return (
        <>
            {/* Fixed objects */}
            <Box position={[-1.2, 0, 0]} addMode={addMode} />
            <Box position={[1.2, 0, 0]} addMode={addMode} />
            <Sphere position={[-2, 2, 0]} addMode={addMode} size={[2, 50, 50]} />
            <Sphere position={[8, 5, 0]} addMode={addMode} size={[1, 10, 10]} />

            {/* Models (Rabbit, Cat) */}
            <DogModel position={[3, 0, 0]} />
            <CatModel position={[5, 0.2, 0]} />
            <RabbitModel position={[7, 0, 0]} />

            {/* User objects  */}
            {objects.map((obj) => <Sphere position={[1, 5, 0]} key={obj} addMode={addMode} size={[1, 10, 10]} />)}


        </>
    );
}

function Loader(props) {
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const { progress } = useProgress()
    if (progress === 100) {
        props.scene.background = cubeTextureLoader.load([stars, stars, stars, stars, stars, stars]);
    }
    return <Html center>{progress} % loaded</Html>
}

function Plane() {
    return (
        <mesh position={[0, 0, 0]} rotation={[-0.5 * Math.PI, 0, 0]} >

            <planeGeometry args={[50, 50]}></planeGeometry>
            <meshBasicMaterial color={0xFFFFFF} side={THREE.DoubleSide}></meshBasicMaterial>
        </mesh>
    )
}

export default function Canvas3f(props) {
    let { selectObj, addMode, setSelectObj } = props;

    const scene = new THREE.Scene();


    return (
        <div style={{ minWidth: '300px', maxWidth: '500px', height: '500px' }}>
            <Canvas scene={scene}>
                <Suspense fallback={<Loader scene={scene} />}>
                    {/* Mouse controls */}
                    <OrbitControls />

                    {/* Plane and grids */}
                    <Plane />
                    <gridHelper args={[50, 50]}></gridHelper>

                    {/* Lights and camera */}
                    <ambientLight />
                    <pointLight position={[50, 50, 50]} />
                    <PerspectiveCamera position={[-10, 30, 30]} makeDefault />

                    {/* Scene  */}
                    <Scene addMode={addMode} selectObj={selectObj} setSelectObj={setSelectObj} ></Scene>
                </Suspense>

            </Canvas>
        </div>
    )

}