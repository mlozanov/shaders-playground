#version 150 core

uniform vec4 lightPos;
uniform vec4 cameraPos;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform mat4 localRotationMatrix;

in vec3 in_Position;
in vec3 in_Normal;

out vec3 normal, lightDir, eyeVec, vVertex;

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
	vVertex = (pvm * position).xyz;

	lightDir = (vLightPosition - vVertex);
	eyeVec = normalize(cameraPos.xyz - vVertex);

	gl_Position = pvm * position;
}
