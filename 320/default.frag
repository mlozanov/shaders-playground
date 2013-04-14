#version 150 core

uniform vec4 termCoeff;
uniform vec4 colorDiffuse;
uniform vec4 colorSpecular;
uniform vec4 rimCoeff;

in vec3 normal, lightDir, eyeVec; //, vVertex;

out vec4 Color;

float halfLambert(in vec3 vect1, in vec3 vect2)
{
    float product = dot(vect1,vect2);
    return product * 0.5 + 0.5;
}

void main (void)
{
	//vec4 final_color = vec4(0.18,0.18,0.18,1.0); 
	vec4 baseColor = vec4(0.0,0.0,0.0,1.0); 
						
	vec3 N = normalize(normal);
	vec3 L = normalize(lightDir);
	vec3 E = normalize(eyeVec);
	vec3 R = reflect(-L, N);

	float dist = length(lightDir);

	float att = 1.0 / (1.0 + termCoeff.z * dist + termCoeff.w * dist * dist);
	
	float wrap = 0.3;
	float lambertTerm = (max(0.0, dot(N,L)) + wrap) / (1.0 + wrap);
	float specular = pow( max(0.0, dot(R, E)), 128.0 );

	vec4 diffuseTerm = colorDiffuse * vec4(vec3(att * lambertTerm * termCoeff.x), 1.0);		
	vec4 specularTerm = colorSpecular * vec4(att * termCoeff.y * vec3(specular),1.0);

	vec4 rimTerm = att * pow( 1.0 - dot(N, E), rimCoeff.w ) * rimCoeff.xyzw; // * rimCoeff.w;

	Color = baseColor + diffuseTerm + specularTerm + rimTerm;

	// debug 
	//gl_FragColor = vec4(vec3(rimTerm), 1.0);
	//gl_FragColor = vec4(vec3(halfLambert(N,L)),1.0);	
}

