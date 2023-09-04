import * as THREE from 'three';
import * as dat from 'dat.gui';
import React, { useRef, useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import stars from '../../Wallpaper/stars.jpg';

export default function Canvas(props) {
  let first = true;                      // First render
  /* Definizione istanza rayCaster (intercetta movimento mouse) */
  const mousePosition = new THREE.Vector2();
  const rayCaster = new THREE.Raycaster();

  const canvasRef = useRef();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  let renderer = new THREE.WebGLRenderer();


  const initThree = () => {
    renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    const scene = new THREE.Scene();


    /* Imposta il colore/immagine di sfondo */
    //renderer.setClearColor(0xFFAAFFFF)  //Paint the wall
    //const textureLoader = new THREE.TextureLoader(); //Set a 2D image
    //scene.background = textureLoader.load(stars);

    const cubeTextureLoader = new THREE.CubeTextureLoader();
    scene.background = cubeTextureLoader.load([
      stars,
      stars,
      stars,
      stars,
      stars,
      stars
    ]);


    /* Imposta la dimensione del canvas */
    renderer.setSize(500, 500);

    /* Imposta la posizione della camera */
    //camera.position.z = 5;
    //camera.position.y = 1;
    camera.position.set(-10, 30, 30);

    /* Imposta il movimento mediante mouse */
    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.update();

    /* Creazione di un plane */
    const planeGeometry = new THREE.PlaneGeometry(50, 50);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      side: THREE.DoubleSide  //Plane visibile anche rovescio
    })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);
    plane.rotation.x = -0.5 * Math.PI;

    /* Aggiunta griglia al plane */
    const gridHelper = new THREE.GridHelper(50);
    scene.add(gridHelper);

    /* Aggiungi helper assi alla scena */
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    /* Crea un oggetto 3D (Box) */
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const box = new THREE.Mesh(geometry, material);
    box.name = 'myBox';

    /* Aggiungi l'oggetto alla scena */
    scene.add(box);

    /* Crea un oggetto 3D (Sfera) */
    const spheregeometry = new THREE.SphereGeometry(2, 50, 50);
    const spherematerial = new THREE.MeshBasicMaterial({ color: 0xff0 });
    const sphere = new THREE.Mesh(spheregeometry, spherematerial);
    sphere.position.set(-5, 2, 0);

    /* Aggiungi l'oggetto alla scena */
    scene.add(sphere);

    /* Aggiunta modificatore colore e velocità (dat.gui) */
    const options = {
      sphereColor: 0xff0,
      sphereWireframe: false,
      sphereSpeed: 0.01
    };

    if (!first) {
      const gui = new dat.GUI();

      gui.addColor(options, 'sphereColor').onChange(function (e) {
        sphere.material.color.set(e);
      })

      gui.add(options, 'sphereWireframe').onChange(function (e) {
        sphere.material.wireframe = e;
      })

      gui.add(options, 'sphereSpeed', 0, 0.1); // Define min value o and maxValue 0.1
    }

    first = false;

    let step = 0;

    /* Funzione per l'animazione: aggiornamento a 60 fps */
    const animate = () => {

      // Rimbalzo dell'oggetto sphere
      step += options.sphereSpeed;
      sphere.position.y = 10 * Math.abs(Math.sin(step)) + 2;

      // Intercettamento movimento mouse
      rayCaster.setFromCamera(mousePosition, camera); // Definizione dei due limiti del raggio di intercezione
      const intersects = rayCaster.intersectObjects(scene.children); // Array contenente gli oggetti intercettati con mouse 

      intersects.forEach(obj => {
        if (obj.object.id === sphere.id) {
          obj.object.material.color.set(0xFF0000);
        }
        if (obj.object.name === box.name) {
          // Rotazione dell'oggetto box
          box.rotation.x += 0.01;
          box.rotation.y += 0.01;
        }
      });



      // Renderizza la scena
      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    //Funzione per l'animazione con controllo velocità comandato mediante time
    /* const animate = (time) => {
      requestAnimationFrame(animate);
 
      // Rotazione dell'oggetto
      box.rotation.x = time / 1000;
      box.rotation.y = time / 1000;
 
      // Renderizza la scena
      renderer.render(scene, camera);
    };
 
    animate(10); */


  };

  const handleResize = () => {
    const { current } = canvasRef;

    if (current) {
      const { clientWidth, clientHeight } = current;

      // Aggiorna la prospettiva della camera
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();

      // Aggiorna le dimensioni del canvas
      renderer.setSize(clientWidth, clientHeight);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    /* Configurazione Raycaster con coordinate del mouse relative al Canvas */
    const canvas = renderer.domElement;
    const rect = canvas.getBoundingClientRect();

    window.addEventListener('mousemove', function (e) {
      mousePosition.x = ((e.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
      mousePosition.y = - ((e.clientY - rect.top) / canvas.clientHeight) * 2 + 1;
    });


    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    initThree();
    handleResize();
  }, []);


  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );


}

