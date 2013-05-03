#version 150 core

uniform vec4 termCoeff;
uniform vec4 colorDiffuse;
uniform vec4 colorSpecular;
uniform vec4 rimCoeff;

in vec3 normal, lightDir, eyeVec, worldVertex;

out vec4 Color;

const vec3 sunlightDirection = vec3(0.0,0.0,-1.0);

float halfLambert(in vec3 vect1, in vec3 vect2)
{
    float product = dot(vect1,vect2);
    return product * 0.5 + 0.5;
}

vec4 pixelLit(in vec3 lightDirection, bool isDirectional)
{
	vec4 baseColor = vec4(0.0,0.0,0.0,1.0); 
						
	vec3 N = normalize(normal);
	vec3 L = normalize(lightDirection);
	vec3 E = normalize(eyeVec);
	vec3 R = reflect(-L, N);

	float dist = isDirectional ? 1.0 : length(lightDirection);

	float att = isDirectional ? 1.0 : (1.0 / (1.0 + termCoeff.z * dist + termCoeff.w * dist * dist));
	
	float wrap = 0.3;
	float lambertTerm = (max(0.0, dot(N,L)) + wrap) / (1.0 + wrap);
	float specular = pow( max(0.0, dot(R, E)), 128.0 );

	vec4 diffuseTerm = 1.0 * colorDiffuse * vec4(vec3(att * lambertTerm * termCoeff.x), 1.0);		
	vec4 specularTerm = 1.0 * colorSpecular * vec4(att * termCoeff.y * vec3(specular),1.0);

	vec4 rimTerm = att * pow( 1.0 - dot(N, E), rimCoeff.w ) * rimCoeff.xyzw; // * rimCoeff.w;

	return (baseColor + diffuseTerm + specularTerm + rimTerm);
}

void main (void)
{
	//vec4 final_color = vec4(0.18,0.18,0.18,1.0); 

	Color = pixelLit(lightDir, false) +  pixelLit(sunlightDirection, true);

	//Color.w = vVertex.z;
	// debug 
	//gl_FragColor = vec4(vec3(rimTerm), 1.0);
	//Color = vec4(vec3(halfLambert(N,L)),1.0);	
}

