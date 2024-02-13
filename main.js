//IMPORT MODULES
import './style.css';
import * as THREE from 'three';
<<<<<<< HEAD
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
=======
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';

>>>>>>> 32225192f0dba20b4eeab3f2ef8954953ffb8e50

//CONSTANT & VARIABLES
let width = window.innerWidth;
let height = window.innerHeight;
<<<<<<< HEAD

//-- SCENE VARIABLES
=======
//-- GUI PAREMETERS

//-- SCENE VARIABLES
var gui;
>>>>>>> 32225192f0dba20b4eeab3f2ef8954953ffb8e50
var scene;
var camera;
var renderer;
var container;
var control;
<<<<<<< HEAD

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

=======
var ambientLight;
var directionalLight;

//-- GEOMETRY PARAMETERS
//Create an empty array for storing all the geometrie
var nodes = [];
var edges = [];
var angleMultiplier = 10;
var level = 3;
 

function main(){
  //GUI
    

  //CREATE SCENE AND CAMERA
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x888888); // Set background color to black
  camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000);
  camera.position.set(20, 10, 20)

  //LIGHTINGS
  ambientLight = new THREE.AmbientLight(0xffffff, 0.02);
  scene.add(ambientLight);

  directionalLight = new THREE.DirectionalLight( 0xffcc00, 200);
  directionalLight.position.set(2,5,5);
  directionalLight.target.position.set(-1,-1,0);
  scene.add( directionalLight );
  scene.add(directionalLight.target);

  //GEOMETRY INITIATION
  // Testing the Nodes Clas
  var location = new THREE.Vector3(2,0,2);
  generateTree(location, level, 20, null);

  // Initiate first cubes


  //RESPONSIVE WINDOW
  window.addEventListener('resize', handleResize);
 
  //CREATE A RENDERER
  renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container = document.querySelector('#threejs-container');
  container.append(renderer.domElement);
  
  //CREATE MOUSE CONTROL
  control = new OrbitControls( camera, renderer.domElement );

  //EXECUTE THE UPDATE
  animate();
}
 
>>>>>>> 32225192f0dba20b4eeab3f2ef8954953ffb8e50
//-----------------------------------------------------------------------------------
//HELPER FUNCTIONS
//-----------------------------------------------------------------------------------

<<<<<<< HEAD
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
=======
//RECURSIVE TREE GENERATION
function generateTree(position, level, parentAngle, parent, branches = 3){
  var node = new TreeNode(position, level, parentAngle,parent);
  nodes.push(node);

  if (parent){
    var edge = new Edge(parent.position, node.position);
    edges.push(edge);
  }

    if (level > 0){
      node.createChildren(branches);
        for(var i=0; i<node.children.length; i++){
          var child = node.children[i];
          // calculate 
          var childAngle = parentAngle + (i / branches) * 2 * Math.PI;
          generateTree(child.position, child.level, child.angle, node, branches);
      
    }
  }
}




//RESPONSIVE
function handleResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  renderer.render(scene, camera);
}

// RANDOM INTEGER IN A RANGE

function getRndInteger(min, max){
  return Math.floor(Math.random() * (max - min + 10)) + min;
>>>>>>> 32225192f0dba20b4eeab3f2ef8954953ffb8e50
}

//ANIMATE AND RENDER
function animate() {
<<<<<<< HEAD
    requestAnimationFrame(animate);
    control.update(); 

    // Dönüş animasyonu
    scene.rotation.y += 0.006;

    renderer.render(scene, camera);
}
//-----------------------------------------------------------------------------------

// EXECUTE MAIN 
main();
=======
  requestAnimationFrame(animate);
  control.update(); 
  // Add this line to update controls
  renderer.render(scene, camera);
}
//-----------------------------------------------------------------------------------
// CLASS
//-----------------------------------------------------------------------------------
 class TreeNode {
  constructor(position, level, parentAngle, parent) {
    this.position = position;
    this.level = level;
    this.parentAngle = parentAngle;
    this.parentDirection = new THREE.Vector3(0,1,0);
    this.parent = parent;
    this.children = [];
//Calculate the angle based on the parent's angle
this.angle = parentAngle + getRndInteger(0 - angleMultiplier / 2, angleMultiplier / 2) * (Math.PI / 180);

this.length = this.level ===0 ? 2:Math.random()* + 1;

//Create the shape for the node
var nodeGeometry = new THREE.SphereGeometry(0.1, 10, 10);
var material = new THREE.MeshPhongMaterial({color:0x22ff00});
this.nodeMesh = new THREE.Mesh(nodeGeometry, material);
this.nodeMesh.position.copy(this.position);
//Add the node to the scene
scene.add(this.nodeMesh);

//Create an edge (branch)connecting to the parent if it exist
if (parent){
  var edge = new Edge(parent.position, this.position);
  this.edgeMesh = edge.mesh;
  scene.add(this.edgeMesh);

}
  }
 

 createChildren(branches){
  for(var i=0; i<3; i++){
    var childPosition = new THREE.Vector3().copy(this.position);
    let axisZ = new THREE.Vector3(0,0,1);
    let axisY = new THREE.Vector3(0,1,0);

    this.parentDirection.applyAxisAngle(axisZ, this.angle);
    this.parentDirection.applyAxisAngle(axisY, this.angle);

    childPosition.x += this.parentDirection.x * this.length;
    childPosition.y += this.parentDirection.y * this.length;
    childPosition.z += this.parentDirection.z * this.length;
    // 
    
    var child = new TreeNode(childPosition, this.level-1, this.angle, this)
    this.children.push(child);


  }
 }
 }

 class Edge{
  constructor(start, end){
    this.start = start;
    this.end = end;
    const points = [];
    points.push(this.start);
    points.push(this.end);

    var edgeGeometry = new THREE.BufferGeometry().setFromPoints(points);
    var material = new THREE.MeshLambertMaterial({color:0x00ff00});
    this.mesh = new THREE.Line(edgeGeometry, material);


  }
 }
//-----------------------------------------------------------------------------------
// EXECUTE MAIN 
//-----------------------------------------------------------------------------------

main();

>>>>>>> 32225192f0dba20b4eeab3f2ef8954953ffb8e50
