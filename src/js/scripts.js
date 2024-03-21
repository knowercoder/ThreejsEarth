import * as THREE from 'three';
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import earthtex from '../img/earthTexture.jpg';
import vert from '../Shaders/vertex.glsl';
import frag from '../Shaders/fragment.glsl';
import vertAtmosphere from '../Shaders/vertexAtmosphere.glsl';
import fragAtmosphere from '../Shaders/fragmentAtmosphere.glsl';

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Sets the color of the background
renderer.setClearColor(0x000000);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Sets orbit control to move the camera around
//const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning
camera.position.set(0, 0, 20);
//orbit.update();

const sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 30), 
new THREE.ShaderMaterial({
    vertexShader: vert,
    fragmentShader: frag,
    uniforms: {
        globeTexture: {
            value: new THREE.TextureLoader().load(earthtex)
        }
    }
}))

const Atmosphere = new THREE.Mesh(new THREE.SphereGeometry(5, 30), 
new THREE.ShaderMaterial({
    vertexShader: vertAtmosphere,
    fragmentShader: fragAtmosphere,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
    
}))
Atmosphere.scale.set(1.2, 1.2, 1.2);

//scene.add(sphere);
scene.add(Atmosphere)

const group = new THREE.Group()
group.add(sphere)
scene.add(group)

const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial()
const starverts = []
for(let i = 0; i < 1000; i++){
    const x = (Math.random() - 0.5) * 500
    const y = (Math.random() - 0.5) * 500
    const z = -Math.random() * 1000
    starverts.push(x, y, z)
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starverts, 3))
const stars = new THREE.Points(starGeometry, starMaterial)
scene.add(stars)

const mouse = {
    x: undefined,
    y: undefined
}

function animate() {
    renderer.render(scene, camera);
    sphere.rotation.y += 0.001;
    gsap.to(group.rotation, {
        x: mouse.y * 0.1,
        y: mouse.x * 0.3
    })
}

renderer.setAnimationLoop(animate);

addEventListener('mousemove', () => {
    mouse.x = (event.clientX / innerWidth) * 2 - 1
    mouse.y = (event.clientY / innerHeight) * 2 + 1
})

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});