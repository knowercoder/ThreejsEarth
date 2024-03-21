varying vec2 vertUV;
varying vec3 vertNormal;

void main(){
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
    vertUV = uv;
    vertNormal = normalize(normalMatrix * normal);

}