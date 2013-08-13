#version 150 core

uniform vec4 lightPos;
uniform vec4 cameraPos;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform mat4 localRotationMatrix;

in vec3 in_Position;
in vec3 in_Normal;

out vec3 normal, lightDir, eyeVec, worldVertex;
out float depth;

const float near = 1.0;
const float far = 1024.0;

void main()
{	
    mat3 nm;

    mat4 vm = viewMatrix * modelMatrix;
    mat4 pvm = projectionMatrix * vm;

    nm[0] = vm[0].xyz;
    nm[1] = vm[1].xyz;
    nm[2] = vm[2].xyz;

	normal = nm * in_Normal;

    vec4 position = localRotationMatrix * vec4(in_Position,1.0);

	vec3 vLightPosition = lightPos.xyz;
	worldVertex = (vm * position).xyz;

	lightDir = (vLightPosition - worldVertex);
	eyeVec = normalize(cameraPos.xyz - worldVertex);

	gl_Position = pvm * position;

    depth = (gl_Position.z - near) * (1.0 / (far - near));
}
