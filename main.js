//IMPORT MODULES
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//CONSTANT & VARIABLES
let width = window.innerWidth;
let height = window.innerHeight;

//-- SCENE VARIABLES
var scene;
var camera;
var renderer;
var container;
var control;

//-- GEOMETRY PARAMETERS
var nodes = [];
var numNodes = 10; // Yuvarlak sayısı

function main(){
    //CREATE SCENE AND CAMERA
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x888888); // Set background color to black
    camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
    camera.position.z = 20;

    //LIGHTING
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    //GEOMETRY INITIATION
    generateNodes();

    //CREATE A RENDERER
    renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    container = document.querySelector('#threejs-container');
    container.appendChild(renderer.domElement);

    //CREATE MOUSE CONTROL
    control = new OrbitControls( camera, renderer.domElement );

    //RESPONSIVE WINDOW
    window.addEventListener('resize', handleResize);

    //EXECUTE THE UPDATE
    animate();
}

//-----------------------------------------------------------------------------------
//HELPER FUNCTIONS
//-----------------------------------------------------------------------------------

//GENERATE NODES (CIRCLES)
function generateNodes() {
    for (let i = 0; i < numNodes; i++) {
        let angle = (i / numNodes) * Math.PI * 2;
        let x = Math.cos(angle) * 5;
        let y = Math.sin(angle) * 5;

        let geometry = new THREE.SphereGeometry(0.5, 32, 32);
        let material = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0xFFD700 : 0x8A2BE2 }); // Sarı veya mor renk seçimi
        let node = new THREE.Mesh(geometry, material);
        node.position.set(x, y, 0);
        scene.add(node);
        nodes.push(node);
    }

    // Bağlantılar için malzeme
    let lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 }); // Siyah renk

    // Yuvarlakların bağlantıları oluşturuluyor
    for (let i = 0; i < nodes.length; i++) {
        // Başlangıç noktası
        let startPoint = nodes[i].position;

        // Diğer yuvarlaklara bağlantı oluşturma
        for (let j = i + 1; j < nodes.length; j++) {
            let endPoint = nodes[j].position;

            // Bağlantı çizgisi oluşturuluyor
            let points = [startPoint, endPoint];
            let geometry = new THREE.BufferGeometry().setFromPoints(points);
            let line = new THREE.Line(geometry, lineMaterial);
            scene.add(line);
        }
    }
}

//RESPONSIVE
function handleResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

//ANIMATE AND RENDER
function animate() {
    requestAnimationFrame(animate);
    control.update(); 

    // Dönüş animasyonu
    scene.rotation.y += 0.006;

    renderer.render(scene, camera);
}
//-----------------------------------------------------------------------------------

// EXECUTE MAIN 
main();