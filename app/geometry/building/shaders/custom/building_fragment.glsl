//uniform sampler2D globeTexture;
varying vec2 vertexUV;
varying vec3 vertexNormal;
varying vec3 vertexPosition;

#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

vec2 brickTile(vec2 _st, float _zoom){
    _st *= _zoom;
    // Here is where the offset is happening
    _st.x += step(1., mod(_st.y,2.0)) * 0.5;
    return fract(_st);
}

void main() {
    
    #include <clipping_planes_fragment>
    #include <logdepthbuf_fragment>
    
    float z = vertexPosition.z;
    z = step(1.5,mod(z,3.0));
    gl_FragColor = vec4(vec3(z), 1.0);
    
    #include <fog_fragment>
    
}