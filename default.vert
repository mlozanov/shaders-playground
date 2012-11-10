uniform vec4 lightPos;
uniform vec4 cameraPos;

varying vec3 normal, lightDir, eyeVec, vVertex;

void main()
{	
	normal = gl_NormalMatrix * gl_Normal;

	vec3 vLightPosition = lightPos.xyz;
	vec3 vVertex = (gl_ModelViewProjectionMatrix * gl_Vertex).xyz;

	lightDir = (vLightPosition - vVertex);
	eyeVec = normalize(cameraPos.xyz - vVertex);

	gl_Position = ftransform();		
}
