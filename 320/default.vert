#version 150 core

uniform vec4 lightPos;
uniform vec4 cameraPos;

in mat4x4 modelMatrix;
in mat4x4 projectionMatrix;
out vec3 normal, lightDir, eyeVec, vVertex;

void main()
{	
	normal = vec3(0,0,1); //gl_NormalMatrix * gl_Normal;

	vec3 vLightPosition = lightPos.xyz;
	vec3 vVertex = vec3(1,1,1); // (gl_ModelViewProjectionMatrix * gl_Vertex).xyz;

	lightDir = (vLightPosition - vVertex);
	eyeVec = normalize(cameraPos.xyz - vVertex);

	//gl_Position = ftransform();		
}
