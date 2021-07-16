'use strict';

// Import Threejs.
var THREE = require('three');
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Water } from 'three/examples/jsm/objects/Water';
import { Sky } from 'three/examples/jsm/objects/Sky';
const loader = new GLTFLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
//scene.background = new THREE.Color( 0xffffff );

const renderer = new THREE.WebGLRenderer();
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls(camera, renderer.domElement);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
const sun = new THREE.Vector3();
camera.position.set(30,30,100);

    // Water

    const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

    let water = new Water(
        waterGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load( 'textures/waternormals.jpg', function ( texture ) {

                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

            } ),
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: scene.fog !== undefined
        }
    );

    water.rotation.x = - Math.PI / 2;

    scene.add( water );

    // Skybox

    const sky = new Sky();
    sky.scale.setScalar( 10000 );
    scene.add( sky );

    const skyUniforms = sky.material.uniforms;

    skyUniforms[ 'turbidity' ].value = 10;
    skyUniforms[ 'rayleigh' ].value = 2;
    skyUniforms[ 'mieCoefficient' ].value = 0.005;
    skyUniforms[ 'mieDirectionalG' ].value = 0.8;

    const parameters = {
        elevation: 2,
        azimuth: 180
    };

const pmremGenerator = new THREE.PMREMGenerator( renderer );

function updateSun() {

    const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
    const theta = THREE.MathUtils.degToRad( parameters.azimuth );

    sun.setFromSphericalCoords( 1, phi, theta );

    sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
    water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

    scene.environment = pmremGenerator.fromScene( sky ).texture;

}

updateSun();

//const geometry = new THREE.BoxGeometry();
//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );

loader.load('../models/scene.gltf', (gltf) => {
    gltf.scene.traverse( function ( child ) {
        if ( child.isMesh ) {
            child.geometry.center(); // center here
        }
    });
    gltf.scene.scale.set(0.1,0.1,0.1) // scale here
    gltf.scene.position.set(0,25,0);
    scene.add(gltf.scene);
});


renderer.setSize( window.innerWidth , window.innerHeight - 0.1);
function animate() {
	requestAnimationFrame( animate );
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
    controls.update();
    const time = performance.now() * 0.001;

    //mesh.position.y = Math.sin( time ) * 20 + 5;
    //mesh.rotation.x = time * 0.5;
    //mesh.rotation.z = time * 0.51;

    water.material.uniforms[ 'time' ].value += 1.0 / 900.0;
	renderer.render( scene, camera );
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect =  window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth , window.innerHeight - 0.1);

}
animate();