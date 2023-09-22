import * as THREE from 'three';
import { Sphere, Box } from "../Components/Canvas/Objects/Objects.js";

function createGeometry(type, size) {
  switch (type) {
    case 'BOX':
      /* Crea un oggetto 3D (Box) */
      return size ? new THREE.BoxGeometry(size[0], size[1], size[2]) : new THREE.BoxGeometry();

    case 'SPHERE':
      /* Crea un oggetto 3D (Sfera) */
      return size ? new THREE.SphereGeometry(size[0], size[1], size[2]) : new THREE.SphereGeometry();

    default: return;
  }
}

export function createObject(type, name, size, texture, color, position) {

  const geometry = createGeometry(type, size);
  const material = new THREE.MeshBasicMaterial(color ? {
    color
  } : {
    map: THREE.TextureLoader(texture)
  });
  const mesh = new THREE.Mesh(geometry, material);
  const obj = new THREE.Object3D();

  obj.add(mesh);

  if (name) { obj.name = name }
  if (position) { mesh.position.set(position[0], position[1], position[2]) }

  return { mesh, obj }

}

export function printObject(obj, setSelectObj, mode) {
  switch (obj.type) {
    case 'SPHERE': return <Sphere position={obj.position} key={obj.id} object={obj} color={obj.color} mode={mode} setSelectObj={setSelectObj} size={[obj.size.x, obj.size.y, obj.size.z]} />
    case 'BOX': return <Box position={obj.position} key={obj.id} object={obj} color={obj.color} mode={mode} setSelectObj={setSelectObj} size={[obj.size.x, obj.size.y, obj.size.z]} />
    default: return <></>
  }

}
