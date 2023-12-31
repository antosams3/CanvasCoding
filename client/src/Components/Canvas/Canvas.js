import * as THREE from 'three';
import * as dat from 'dat.gui';
import React, { useRef, useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import stars from '../../Wallpaper/stars.jpg';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createObject } from '../../Utils/CanvasObjects.js';


export default function Canvas(props) {
  let { selectObj, addMode } = props;

  let first = true;  // First render

  /* Definizione istanza rayCaster (intercetta movimento mouse) */
  const mousePosition = new THREE.Vector2();
  const rayCaster = new THREE.Raycaster();

  /* Definizione parametri per aggiunta oggetti su onClick */
  const plane = new THREE.Plane();
  const planeNormal = new THREE.Vector3();
  const intersectionPoint = new THREE.Vector3();

  let scene = new THREE.Scene();
  const canvasRef = useRef();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  let renderer = new THREE.WebGLRenderer();

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

  const handleClick = () => {
    if(addMode){
    const sphere = createObject('SPHERE', 'mySphere', [0.125, 30, 30], null, 0xff0, null);
    scene.add(sphere.obj);
    sphere.mesh.position.copy(intersectionPoint);
    }

  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    /* Configurazione Raycaster con coordinate del mouse relative al Canvas */
    const canvas = renderer.domElement;
    const rect = canvas.getBoundingClientRect();

    window.addEventListener('mousemove', function (e) {
      mousePosition.x = ((e.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
      mousePosition.y = - ((e.clientY - rect.top) / canvas.clientHeight) * 2 + 1;

      planeNormal.copy(camera.position).normalize();
      plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
      rayCaster.setFromCamera(mousePosition, camera);
      rayCaster.ray.intersectPlane(plane, intersectionPoint);

    });

    window.addEventListener('click', handleClick);


    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);

    };
  }, [selectObj, addMode]);

  useEffect(() => {
    initThree();
    handleResize();
  }, []);


  const initThree = () => {
    renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    if (!first) {
      scene = new THREE.Scene();
    }

    const ambientLight = new THREE.AmbientLight();
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight();
    pointLight.position.set(50, 50, 50)
    scene.add(pointLight);


    /* Import Cat and Rabbit + Animazione */
    let mixerCat; // Variabile globale per animazione 
    let mixerRabbit; // Variabile globale per animazione 
    const catUrl = new URL('./Assets/Cat.glb', import.meta.url);
    const rabbitUrl = new URL('./Assets/Rabbit.glb', import.meta.url);

    const assetLoader = new GLTFLoader();

    assetLoader.load(catUrl.href, function (gltf) {
      const model = gltf.scene;
      model.position.set(6, 1, 0)
      scene.add(model);
      mixerCat = new THREE.AnimationMixer(model); // Animation player 
      const clips = gltf.animations;

      /* PLay animation given the name */
      const clip = THREE.AnimationClip.findByName(clips, 'HeadTailAction');
      const action = mixerCat.clipAction(clip);
      action.play();

    }, undefined, function (error) {
      console.error(error);
    })

    assetLoader.load(rabbitUrl.href, function (gltf) {
      const model = gltf.scene;
      model.position.set(3, 1, 0)
      scene.add(model);
      mixerRabbit = new THREE.AnimationMixer(model); // Animation player 

      const clips = gltf.animations;

      /* PLay animation given the name */
      const clip = THREE.AnimationClip.findByName(clips, 'SnoutTailEarsAction');
      const action = mixerRabbit.clipAction(clip);
      action.play();

    }, undefined, function (error) {
      console.error(error);
    })


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
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(planeMesh);

    planeMesh.rotation.x = -0.5 * Math.PI; // Ruota il plane di 90 gradi



    /* Aggiunta griglia al plane */
    const gridHelper = new THREE.GridHelper(50);
    scene.add(gridHelper);

    /* Aggiungi helper assi alla scena */
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    /* Creazione oggetti 3D */
    const box = createObject('BOX', 'myBox', null, null, 0xff0000, [0, 0, 0]);
    scene.add(box.obj);
    const sphere = createObject('SPHERE', 'mySphere', [2, 50, 50], null, 0xff0, [-5, 0, 0]);
    scene.add(sphere.obj);

    /* Aggiunta modificatore colore e velocità (dat.gui) */
    const options = {
      sphereColor: 0xff0,
      sphereWireframe: false,
      sphereSpeed: 0.01
    };

    if (!first) {
      const gui = new dat.GUI();

      gui.addColor(options, 'sphereColor').onChange(function (e) {
        sphere.mesh.material.color.set(e);
      })

      gui.add(options, 'sphereWireframe').onChange(function (e) {
        sphere.mesh.material.wireframe = e;
      })

      gui.add(options, 'sphereSpeed', 0, 0.1); // Define min value o and maxValue 0.1
    }

    first = false;

    const clock = new THREE.Clock();

    let step = 0;

    /* Funzione per l'animazione: aggiornamento a 60 fps */
    const animate = () => {

      // Rimbalzo dell'oggetto sphere
      step += options.sphereSpeed;
      sphere.obj.position.y = 10 * Math.abs(Math.sin(step)) + 2;

      // Intercettamento movimento mouse
      rayCaster.setFromCamera(mousePosition, camera); // Definizione dei due limiti del raggio di intercezione
      const intersects = rayCaster.intersectObjects(scene.children); // Array contenente gli oggetti intercettati con mouse 

      intersects.forEach(obj => {
        if (obj.object.id === sphere.mesh.id) {
          obj.object.material.color.set(0xFF0000);
        }
        if (obj.object.id === box.mesh.id) {
          // Rotazione dell'oggetto box
          box.mesh.rotation.x += 0.01;
          box.mesh.rotation.y += 0.01;
        }
      });

      // Animazione Cat
      if (mixerCat) {
        mixerCat.update(clock.getDelta());
      }

      // Animazione Cat
      if (mixerRabbit) {
        mixerRabbit.update(clock.getDelta());
      }

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

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );


}

