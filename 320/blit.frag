#version 150 core

in vec3 texcoord;
in vec3 outNormal;

uniform sampler2D fb;

out vec4 Color;

vec3 reinhard(vec3 x)
{
    return (x/(vec3(1)+x));
}

vec3 tonemap(vec3 x)
{
    return (x/(vec3(6.0)+x));
}

float A = 0.15;
float B = 0.50;
float C = 0.10;
float D = 0.20;
float E = 0.02;
float F = 0.30;
float W = 11.2;

vec3 u2(vec3 x)
{
    return ((x*(A*x+C*B)+D*E)/(x*(A*x+B)+D*F))-E/F;
}

void main()
{
	float pixel = (1.0 + sin(3.14 * texcoord.x * 2.0))*0.25 + (1.0 + cos(3.14 * texcoord.y * 2.0))*0.25;

    vec4 texel = texture(fb,texcoord.xy);
    //pixel = texcoord.x; // + texcoord.y / 1024;

	Color = vec4(tonemap(1.0 * texel.xyz), 1.0); // + 0.2 * vec4(texcoord,1.0); // + vec4( reinhard(texel.xyz+vec3(10*pixel)), 1.0);

    //gl_FragDepth = 1.0;
}
