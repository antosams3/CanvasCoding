import * as React from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from "@react-three/fiber";
import { DogModel, CatModel, RabbitModel } from "../Models/Animals";
import { Sphere, Box } from "../Objects/Objects";


export function Scene(props) {
    const { addMode, selectObj, setSelectObj } = props;
    const [mousePosition, setMousePosition] = React.useState(new THREE.Vector2());
    const plane = new THREE.Plane();
    const planeNormal = new THREE.Vector3();
    const [intersectionPoint, setIntersectionPoint] = React.useState(new THREE.Vector3());
    //const intersectionPoint = new THREE.Vector3();
    const [objects, setObjects] = React.useState([]);
    const rayCaster = new THREE.Raycaster();

    const { camera, scene, gl } = useThree()

    // viewport = canvas in 3d units (meters)


    const handleClick = () => {
        if (addMode) {

            if (selectObj[0] === 'BOX' || selectObj[0] === 'SPHERE') {
                setObjects([...objects, selectObj[0]]);
                setSelectObj([]);
            }
        }
    }

    React.useEffect(() => {
        // Event listeners
        window.addEventListener('click', handleClick);

        return () => {
            // Rimozione event listeners quando il componente viene smontato.
            window.removeEventListener('click', handleClick);
        };
    }, [addMode, selectObj]);

    const handleMove = (e) => {
        /* Configurazione Raycaster con coordinate del mouse relative al Canvas */
        const canvas = gl.domElement;
        const rect = canvas.getBoundingClientRect();

        mousePosition.x = ((e.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
        mousePosition.y = - ((e.clientY - rect.top) / canvas.clientHeight) * 2 + 1;

        planeNormal.copy(camera.position).normalize();
        plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
        rayCaster.setFromCamera(mousePosition, camera);
        rayCaster.ray.intersectPlane(plane, intersectionPoint);

    }

    React.useEffect(() => {

        window.addEventListener('mousemove', handleMove);

        return () => {
            window.removeEventListener('mousemove', handleMove);
        };

    }, [addMode]);


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
            {objects.map((obj) => obj === 'SPHERE' ?
                <Sphere position={intersectionPoint} key={obj} addMode={addMode} size={[1, 10, 10]} /> :
                <Box position={intersectionPoint} key={obj} addMode={addMode} />
            )}

        </>
    );
}