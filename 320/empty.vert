#version 150 core

const vec2 madd=vec2(0.5,0.5);

in vec3 vertex;

out vec2 texcoord;

void main() {
   texcoord = vertex.xy;
   gl_Position = vec4(2.0 * (vec2(-0.5, -0.5) + vertex.xy),0.0,1.0);
}