varying vec3 vertNormal;

void main(){
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
    vertNormal = normalize(normalMatrix * normal);

}