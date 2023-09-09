import { useFrame } from "@react-three/fiber";
import * as React from 'react';
import { DogModel, CatModel, RabbitModel } from "../Models/Animals";
import { Sphere, Box } from "../Objects/Objects";


export function Scene(props) {
    const { addMode, selectObj, setSelectObj } = props;
    //const canvasRef = React.useRef();
    //const [mousePosition, setMousePosition] = React.useState(new THREE.Vector2());
    //const [intersectionPoint, setIntersectionPoint] = React.useState(new THREE.Vector3());
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
        // Event listeners
        window.addEventListener('click', handleClick);

        return () => {
            // Rimozione event listeners quando il componente viene smontato.
            window.removeEventListener('click', handleClick);
        };
    }, [addMode, selectObj]);


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