const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener("resize", function() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height)
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

});


// create a sphere object
var contols = new THREE.OrbitControls(camera, renderer.domElement);
var geometryEarth = new THREE.SphereGeometry(1, 100, 100);
var materialEarth = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load("images/earth1.jpg")});
const sphere = new THREE.Mesh(geometryEarth, materialEarth);
var geometryAtmosphere = new THREE.SphereGeometry(1.05, 100, 100);
var materialAtmosphere = new THREE.MeshBasicMaterial({color: 0x0099DD, wireframe: false, blending: THREE.AdditiveBlending, opacity: 0.2});
const atmosphere = new THREE.Mesh(geometryAtmosphere, materialAtmosphere);
atmosphere.addEventListener("click", function(){
  console.log("working");
})


scene.add(sphere);
scene.add(atmosphere);
camera.position.z = 3;
//Lightning

var ambient = new THREE.AmbientLight(0xFFFFFF, 1);
//var point = new THREE.PointLight(0xFFFFFF, 2, 10);
//point.position.set(1.5,0,2);
scene.add(ambient);
//scene.add(point);



// game logic
var update = function() {
sphere.rotation.y += 0.001;
}
// draw Scene
var render = function() {
  renderer.render(scene, camera);
}
var loop = function() {
  requestAnimationFrame(loop);
  update();
  render();
}
loop();
