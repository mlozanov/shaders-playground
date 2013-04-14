#version 150 core

const vec2 madd=vec2(0.5,0.5);

in vec3 in_Position;
in vec3 in_Normal;
out vec3 texcoord;
out vec3 outNormal;

void main() {
   texcoord = in_Position.xyz; // + in_Normal.xyz;
   outNormal = in_Normal;
   gl_Position = vec4(2.0 * (vec2(-0.5, -0.5) + in_Position.xy),0.0,1.0);
}