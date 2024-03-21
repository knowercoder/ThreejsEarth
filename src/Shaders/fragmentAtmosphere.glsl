varying vec3 vertNormal;

void main(){
    float intensity = pow(0.6 - dot(vertNormal, vec3(0,0,1.0)), 2.2);

    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
}