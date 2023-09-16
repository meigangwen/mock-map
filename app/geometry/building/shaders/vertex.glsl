varying vec2 vertexUV;
varying vec3 vertexNormal;
varying vec3 vertexPosition;

//#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

    //handle the varings
    vertexUV = uv;
    vertexNormal = normalize(normalMatrix * normal);
    vertexPosition = position;

    //#include <uv_vertex>      //handle all sorts of uv mapping
    //#include <color_vertex>   //use of vertex color

    #include <begin_vertex>     //essential for vertex shader
    #include <project_vertex>   //essential for vertex shader
    #include <logdepthbuf_vertex> 
	#include <clipping_planes_vertex>   //called only if > 0 clipping planes are defined
	#include <worldpos_vertex>          //not sure what it does, seems to be related to instancing
    
    //gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}