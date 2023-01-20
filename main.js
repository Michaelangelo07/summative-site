import * as THREE from 'three';
import './style.css';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import gsap from "gsap";
// @ts-ignore
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene()

// const gltfLoader = new GLTFLoader();
// gltfLoader.load('./assets/DROIDS/droids.gltf', (gltfScene))
// scene.add(gltfScene.scene)

const material = new THREE.MeshStandardMaterial({
        color: '#00ff83',
        roughness: 0.4,
    });

const gltfLoader = new GLTFLoader();
gltfLoader.load('./assets/DROIDS/droids.gltf', (gltf) => {
    const root = gltf.scene;
    var newMaterial = new THREE.MeshStandardMaterial
    root.position.z = 19;
    root.position.y -= 1.7;
    root.rotation.x += 0.25;
    root.position.x += 0.035;
    // root.material.color = '#00ff83'
    // root.children[0].material.color = '#00ff83';
    scene.add(root);
})

// const geometry = new THREE.SphereGeometry(3, 64, 64);
// const material = new THREE.MeshStandardMaterial({
//     color: '#00ff83',
//     roughness: 0.4,
// });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 20);
light.intensity = 2;
scene.add(light);

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100); // updated
camera.position.z = 20;
scene.add(camera);

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(1);
renderer.render(scene, camera);

//hi

//EFEFE
const controls = new OrbitControls(light, canvas);
controls.enableDamping = true;



window.addEventListener('resize', () => {
    console.log(window.innerWidth);
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
})

const loop = () => {
    controls.update();
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 15;
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
}
loop();


const tl = gsap.timeline({defaults: {duration: 1}});
// tl.fromTo(scene.opacity, {opacity: 0}, {opacity: 1});
tl.fromTo('nav', {y: '-100%'}, {y: "0%"});
tl.fromTo(".title", {opacity: 0}, {opacity: 1});


let mouseDown = false;
let rgb = [];
window.addEventListener('mousedown', () => (mouseDown = true));
window.addEventListener("mouseup", () => (mousedown = false))

window.addEventListener('mousemove', (e) => {
    if(mouseDown){
        rgb = [Math.round((e.pageX / sizes.width) * 255),
        Math.round((e.pageY / sizes.height) * 255),
        150]

        let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
        new THREE.Color(`rgb(0,100,150)`)
        gsap.to(light.color, {r: newColor.r, g: newColor.g, b: newColor.b})
    }
})