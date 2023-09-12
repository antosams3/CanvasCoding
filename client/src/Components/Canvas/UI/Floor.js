import * as React from 'react';
import * as THREE from 'three';

export function Floor() {
    return (
        <mesh position={[0, 0, 0]} rotation={[-0.5 * Math.PI, 0, 0]} >
            <planeGeometry args={[50, 50]}></planeGeometry>
            <meshBasicMaterial color={0xFFFFFF} side={THREE.DoubleSide}></meshBasicMaterial>
        </mesh>
    )
}

export function HighlightMesh() {
    return (
        <mesh position={[0.5, 0, 0.5]} rotation={[-0.5 * Math.PI, 0, 0]} >
            <planeGeometry args={[1, 1]}></planeGeometry>
            <meshBasicMaterial color={0xFF0011} side={THREE.DoubleSide}></meshBasicMaterial>
        </mesh>
    )

}