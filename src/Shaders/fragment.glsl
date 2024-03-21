uniform sampler2D globeTexture;
varying vec2 vertUV;
varying vec3 vertNormal;

void main(){
    float intensity = 1.0 - dot(vertNormal, vec3(0.0,0.0,1.0));
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);
    vec4 color = texture2D(globeTexture, vertUV);
    color.xyz += atmosphere * 1.2;
    gl_FragColor = color;
}