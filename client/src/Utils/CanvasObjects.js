import * as THREE from 'three';

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
  
