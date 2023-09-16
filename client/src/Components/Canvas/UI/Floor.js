import * as React from 'react';
import * as THREE from 'three';

export function Floor() {
    return (
        <mesh position={[0, 0, 0]} rotation={[-0.5 * Math.PI, 0, 0]} name='ground'>
            <planeGeometry args={[50, 50]}></planeGeometry>
            <meshBasicMaterial color={0xFFFFFF} side={THREE.DoubleSide}> </meshBasicMaterial>
        </mesh>
    )
}

export function HighlightMesh(props) {
    const { position, overlap } = props;
    return (
        <mesh position={[position.x, 0, position.z]} rotation={[-0.5 * Math.PI, 0, 0]} >
            <planeGeometry args={[1, 1]}></planeGeometry>
            <meshBasicMaterial color={overlap ? 0xFF0000 : 0x0000FF} side={THREE.DoubleSide}></meshBasicMaterial>
        </mesh>
    )

}