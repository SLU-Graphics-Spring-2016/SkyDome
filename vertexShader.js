
varying vec3 vertex;

void main() {
	vertex      = gl_Vertex.xyz;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position , 1.0);
	
} 
