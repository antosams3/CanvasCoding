import * as React from 'react';
import * as THREE from 'three';
import { useThree } from "@react-three/fiber";
import { DogModel, CatModel, RabbitModel } from "../Models/Animals";
import { Sphere, Box, Cone } from "../Objects/Objects";
import { HighlightMesh } from "./Floor";
import { printObject } from '../../../Utils/CanvasObjects';
import { Manager } from '../useYuka';
import { defaultValues } from '../../../Utils/defaults';

let intersectionsArray;                                                                     // Meshes intersected by mouse 
const rayCaster = new THREE.Raycaster();                                                    // Mouse intersections manager 

export function Scene(props) {
    const { selectObj, setSelectObj, mode, setMode, objects, setObjects, setAddType, addType } = props;          // SelectObj -> active object, mode -> action from side menu 
    const { camera, scene, gl } = useThree();                                               // References to: camera, scene, WebGLRenderer

    const [mousePosition, setMousePosition] = React.useState(new THREE.Vector2());          // Mouse coordinates 
    const [highlightPos, setHighlightPos] = React.useState(new THREE.Vector3(0.5, 1, 0.5)); // Tile highlighted coordinates
    const [overlap, setOverlap] = React.useState(false);                                    // Tiles overlapping object 
    const [index, setIndex] = React.useState(1);                                            // Objects index inside array

    React.useEffect(() => {
        if (mode === 'DEL' && selectObj) {                                                  // Checks if delete mode and object is selected (not null)
            /* Remove selectObj (active object) from objects array */
            const index = objects.indexOf(selectObj);
            if (index !== -1) {
                const newObjects = [...objects];
                newObjects.splice(index, 1);
                setSelectObj(null);
                setMode(null);
                setObjects(newObjects);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, objects, selectObj]);

    const handleClick = () => {

        if (mode === 'ADD' && addType !== null && !overlap) {                    // Checks if ADD mode and addType === ['ObjectType'] and tile's not overlapped
            /* Add new object to the scene */
            const newSize = defaultValues[`${addType}_size`];                            // Get default values for the givenType
            const newobj = {
                id: index,
                type: addType,
                position: new THREE.Vector3(highlightPos.x, 0.5, highlightPos.z),
                size: new THREE.Vector3(newSize[0], newSize[1], newSize[2]),
                color: 'yellow'
            }
            setObjects([...objects, newobj]);                                               // Update objects array
            setIndex(index + 1);                                                            // Update index
            setAddType(null);                                                                 // Deselect object type 
            setOverlap(true);                                                               // Position busy -> tile overlapped

        }

        if (mode === 'MOVE' && selectObj && !overlap) {                 // Checks if MOVE mode and selectedObj and tile's not overlapped
            /* Move existing object to a new position */
            const index = objects.indexOf(selectObj);                                       // Search for the selected object inside the array
            const newObj = {
                id: selectObj.id,
                type: selectObj.type,
                position: new THREE.Vector3(highlightPos.x, 0.5, highlightPos.z),           // Update position coordinates
                size: selectObj.size,
                color: 'yellow'
            }
            const newObjects = [...objects];
            newObjects.splice(index, 1, newObj);                                            // Remove element in position index, replace with newObj
            setObjects(newObjects);                                                         // Update objects array
            setSelectObj(null);
            setMode(null);
        }
    }

    const handleMove = (e) => {
        /* Configurazione Raycaster con coordinate del mouse relative al Canvas */
        const canvas = gl.domElement;
        const rect = canvas.getBoundingClientRect();

        const newmousep = mousePosition;
        newmousep.x = ((e.clientX - rect.left) / canvas.clientWidth) * 2 - 1;               // Set mouse coordinates depending on canvas size
        newmousep.y = - ((e.clientY - rect.top) / canvas.clientHeight) * 2 + 1;
        setMousePosition(newmousep);

        rayCaster.setFromCamera(mousePosition, camera);
        intersectionsArray = rayCaster.intersectObjects(scene.children);

        intersectionsArray.forEach((intersect) => {
            if (intersect.object.name === 'ground') {
                const newpos = new THREE.Vector3().copy(intersect.point).floor().addScalar(0.5);    // Get intersected point and add 0.5 
                setHighlightPos(newpos);                                                            // Highlight the tile 

                const find = objects.find(function (object) {
                    return (object.position.x === newpos.x) && (object.position.z === newpos.z)
                });

                find ? setOverlap(true) : setOverlap(false);

            }
        });
    }

    React.useEffect(() => {

        if (mode === 'ADD' || mode === 'MOVE') {
            /* Event listeners */
            window.addEventListener('click', handleClick);
            window.addEventListener('mousemove', handleMove);

            /* Event listeners removed when component is unmounted */
            return () => {
                window.removeEventListener('click', handleClick);
                window.removeEventListener('mousemove', handleMove);
            };
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, highlightPos]);

    return (
        <>
            {(mode === 'ADD' || mode === 'MOVE') ? <HighlightMesh position={highlightPos} overlap={overlap} /> : ''}

            {/* Fixed objects */}
            <Box position={[-1.2, 0, 0]} mode={mode} object={-3} setSelectObj={setSelectObj} size={[2, 2, 2]} color={'orange'} />
            <Box position={[1.2, 0, 0]} mode={mode} object={-2} setSelectObj={setSelectObj} color={'green'} />
            <Sphere position={[-2, 2, 0]} mode={mode} object={-1} setSelectObj={setSelectObj} size={[2, 50, 50]} color={'blue'} />
            <Sphere position={[8, 5, 0]} mode={mode} object={0} setSelectObj={setSelectObj} size={[1, 10, 10]} color={'white'} />

            {/* Fixed Models (Rabbit, Cat) */}
            <DogModel position={[3, 0, 0]} />
            <CatModel position={[5, 0.2, 0]} />
            <RabbitModel position={new THREE.Vector3(7, 0, 0)} />


            {/* User movable objects  */}
            {objects.map((obj) => printObject(obj, setSelectObj, mode))}

            {/* Yuka path following Steering Behaviour */}
            <Manager>
                <Cone name="Cone"></Cone>
            </Manager>

        </>
    );
}