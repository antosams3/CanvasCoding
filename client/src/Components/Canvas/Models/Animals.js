import { useFrame, useLoader } from "@react-three/fiber";
import * as React from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export function CatModel(props) {
    const { position } = props;
    const [hovered, setHover] = React.useState(false);
    const [active, setActive] = React.useState(false);

    const catUrl = new URL('../Assets/Cat.glb', import.meta.url);
    const gltf = useLoader(GLTFLoader, catUrl.href); // Carica il modello GLB
    const modelRef = React.useRef();
    const mixerRef = React.useRef();

    React.useEffect(() => {
        // Crea un mixer per l'animazione
        if (!mixerRef.current) {
            mixerRef.current = new THREE.AnimationMixer(gltf.scene);
        }

        // Aggiungi le animazioni al mixer
        const clips = gltf.animations;
        const clip = THREE.AnimationClip.findByName(clips, 'HeadTailAction');
        if (clip) {
            const action = mixerRef.current.clipAction(clip);
            action.play();
        }

        // Aggiorna la posizione del modello
        if (modelRef.current) {
            modelRef.current.position.set(position[0], position[1], position[2]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    useFrame((state, delta) => {
        if (mixerRef) {
            mixerRef.current.update(delta);
        }
    });

    return <primitive object={gltf.scene} scale={active ? 1.5 : 1} ref={modelRef}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
        wireframe={hovered} />;
}

export function RabbitModel(props) {
    const { position } = props;
    const rabbitUrl = new URL('../Assets/Rabbit.glb', import.meta.url);
    const [active, setActive] = React.useState(false);

    const gltf = useLoader(GLTFLoader, rabbitUrl.href); // Carica il modello GLB
    const modelRef = React.useRef();
    const mixerRef = React.useRef();

    React.useEffect(() => {
        // Crea un mixer per l'animazione
        if (!mixerRef.current) {
            mixerRef.current = new THREE.AnimationMixer(gltf.scene);
        }

        // Aggiungi le animazioni al mixer
        const clips = gltf.animations;
        const clip = THREE.AnimationClip.findByName(clips, 'SnoutTailEarsAction');
        if (clip) {
            const action = mixerRef.current.clipAction(clip);
            action.play();
        }

        // Aggiorna la posizione del modello
        if (modelRef.current) {
            modelRef.current.position.set(position.x, 0, position.z);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useFrame((state, delta) => {
        if (mixerRef) {
            mixerRef.current.update(delta);
        }
    });

    return <primitive object={gltf.scene} scale={active ? 1.5 : 1} onClick={() => setActive(!active)} ref={modelRef} />;
}

export function DogModel(props) {
    const { position } = props;
    const dogUrl = new URL('../Assets/Dog.glb', import.meta.url);
    const gltf = useLoader(GLTFLoader, dogUrl.href); // Carica il modello GLB
    const modelRef = React.useRef();
    const mixerRef = React.useRef();

    React.useEffect(() => {
        // Crea un mixer per l'animazione
        if (!mixerRef.current) {
            mixerRef.current = new THREE.AnimationMixer(gltf.scene);
        }

        // Aggiungi le animazioni al mixer
        const clips = gltf.animations;
        clips.forEach(function (clip) {
            const action = mixerRef.current.clipAction(clip);
            action.play();
        })

        // Aggiorna la posizione del modello
        if (modelRef.current) {
            modelRef.current.position.set(position[0], position[1], position[2]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useFrame((state, delta) => {
        if (mixerRef) {
            mixerRef.current.update(delta);
        }
    });

    return <primitive object={gltf.scene} scale={0.3} ref={modelRef} />;
}