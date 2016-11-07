import FreeLookCamera from "./objects/free_look_camera";
import Globe from "./objects/globe";
import Orbiter from "./objects/orbiter";
import Sun from "./objects/sun";

window.onload = initialize;
function initialize() {
  var context = {
    w: window.document.documentElement.clientWidth,
    h: window.document.documentElement.clientHeight
  }
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, context.w/context.h, 0.1, 1500 );

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( context.w, context.h );
  renderer.domElement.style["height"] = "100%";
  renderer.domElement.style["width"] = "100%";
  document.body.appendChild( renderer.domElement );

  var freeLook = new FreeLookCamera(camera, renderer.domElement);

  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var cube = new THREE.Mesh( geometry, material );

  var globe = new Globe();
  var orbiter = new Orbiter();
  var sun = new Sun();

  var clock = new THREE.Clock();
  clock.start();
  orbiter.mesh.add(freeLook.mesh);

  scene.add(sun.mesh);
  scene.add(globe.mesh);
  scene.add( cube );
  scene.add(orbiter.mesh);
  camera.position.z = 5;

  var render = function () {
    requestAnimationFrame( render );
    var dt = clock.getDelta();
    var t = clock.getElapsedTime();
    orbiter.update(dt, t);
    sun.update(orbiter);
    renderer.render(scene, camera);
  };

  render();
}
