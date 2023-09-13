import * as React from 'react';
import * as THREE from 'three';
import { useThree } from "@react-three/fiber";
import { DogModel, CatModel, RabbitModel } from "../Models/Animals";
import { Sphere, Box } from "../Objects/Objects";
import { HighlightMesh } from "./Floor";


export function Scene(props) {
    const { addMode, selectObj, setSelectObj } = props;

    const [mousePosition, setMousePosition] = React.useState(new THREE.Vector2());
    const [highlightPos, setHighlightPos] = React.useState(new THREE.Vector3(0.5, 1, 0.5));
    const [objects, setObjects] = React.useState([]);
    const [overlap, setOverlap] = React.useState(false);


    let intersectionsArray;
    const rayCaster = new THREE.Raycaster();

    const { camera, scene, gl } = useThree();


    const handleClick = () => {
        if (addMode) {

            if (selectObj[0] === 'BOX' || selectObj[0] === 'SPHERE') {

                const find = objects.find(function (object) {
                    return (object.position.x === highlightPos.x) && (object.position.z === highlightPos.z)
                });

                if (!find) {
                    const newobj = {
                        id: objects.length + 1,
                        type: selectObj[0],
                        position: new THREE.Vector3(highlightPos.x, 0.5, highlightPos.z)
                    }
                    setObjects([...objects, newobj]);
                    setSelectObj([]);
                    setOverlap(true);
                }

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
    }, [highlightPos]);

    const handleMove = (e) => {
        /* Configurazione Raycaster con coordinate del mouse relative al Canvas */
        const canvas = gl.domElement;
        const rect = canvas.getBoundingClientRect();

        mousePosition.x = ((e.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
        mousePosition.y = - ((e.clientY - rect.top) / canvas.clientHeight) * 2 + 1;

        rayCaster.setFromCamera(mousePosition, camera);
        intersectionsArray = rayCaster.intersectObjects(scene.children);

        intersectionsArray.forEach((intersect) => {
            if (intersect.object.name === 'ground') {
                const newpos = new THREE.Vector3().copy(intersect.point).floor().addScalar(0.5);
                setHighlightPos(newpos);

                const find = objects.find(function (object) {
                    return (object.position.x === newpos.x) && (object.position.z === newpos.z)
                });
        
                if(find){
                    setOverlap(true);
                }else{
                    setOverlap(false);
                }

            }

            
        });


    }

    React.useEffect(() => {

        window.addEventListener('mousemove', handleMove);

        return () => {
            window.removeEventListener('mousemove', handleMove);
        };

    }, [addMode,highlightPos]);


    return (
        <>
            {addMode ? <HighlightMesh position={highlightPos} overlap={overlap} /> : ''}

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
            {objects.map((obj) => obj.type === 'SPHERE' ?
                <Sphere position={obj.position} key={obj.id} addMode={addMode} size={[1, 10, 10]} /> :
                <Box position={obj.position} key={obj.id} addMode={addMode} />
            )}

        </>
    );
}