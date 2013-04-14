#version 150 core

uniform vec4 lightPos;
uniform vec4 cameraPos;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

in vec3 in_Position;
in vec3 in_Normal;

out vec3 normal, lightDir, eyeVec; //, vVertex;

void main()
{	
	normal = (viewMatrix * modelMatrix * vec4(in_Normal,1)).xyz; //gl_NormalMatrix * gl_Normal;

	vec3 vLightPosition = lightPos.xyz;
	vec3 vVertex = (projectionMatrix * viewMatrix * modelMatrix * vec4(in_Position,1.0)).xyz;

	lightDir = (vLightPosition - vVertex);
	eyeVec = normalize(cameraPos.xyz - vVertex);

	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(in_Position,1.0);
}
