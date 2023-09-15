import { useFrame } from "@react-three/fiber";
import * as React from 'react';
import * as dat from 'dat.gui';

export function Box(props) {
    const { mode, setSelectObj, object } = props;     // This reference will give us direct access to the mesh
    const meshRef = React.useRef()    // Set up state for the hovered and active state

    const [hovered, setHover] = React.useState(false);
    const [active, setActive] = React.useState(false);

    const handleClick = () => {
        if (!active) {
            setSelectObj(object);
        } else {
            setSelectObj([]);
        }
        setActive(!active);
    }

    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {
        meshRef.current.rotation.x += delta;
    })


    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={active ? 1.5 : 1}
            onClick={() => handleClick()}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={mode === 'ADD' ? 'hotpink' : 'orange'} wireframe={hovered} />
        </mesh>
    )
}

export function Sphere(props) {
    const { size, mode, setSelectObj, object } = props;
    const meshRef = React.useRef();

    const [hovered, setHover] = React.useState(false);
    const [active, setActive] = React.useState(false);

    const [step, setStep] = React.useState(0);
    const options = ({
        sphereColor: 0xff0,
        sphereWireframe: false,
        sphereSpeed: 0.01
    });

    const handleClick = () => {
        if (!active) {
            setSelectObj(object);
        } else {
            setSelectObj([]);
        }
        setActive(!active);
    }


    React.useEffect(() => {
        const gui = new dat.GUI();

        if (active) {

            gui.addColor(options, 'sphereColor').onChange(function (e) {
                meshRef.current.material.color.set(e);
            })

            gui.add(options, 'sphereWireframe').onChange(function (e) {
                meshRef.current.material.wireframe = e;
            })

            gui.add(options, 'sphereSpeed', 0, 0.1); // Define min value 0 and maxValue 0.1

        } else {
            dat.GUI.toggleHide();
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);


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
            onClick={() => handleClick()}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <sphereGeometry args={[size[0], size[1], size[2]]} />
            <meshStandardMaterial color={mode === 'ADD' ? 'hotpink' : 'orange'} wireframe={hovered} />
        </mesh>
    )
}