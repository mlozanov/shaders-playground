#version 150 core

in vec3 texcoord;
in vec3 outNormal;

uniform sampler2D fb;

out vec4 Color;

vec3 reinhard(vec3 x)
{
    return (x/(vec3(1)+x));
}

void main()
{
	float pixel = (1.0 + sin(3.14 * texcoord.x * 2.0))*0.25 + (1.0 + cos(3.14 * texcoord.y * 2.0))*0.25;

    vec4 texel = texture(fb,texcoord.xy + vec2(0.5,0.5));
    //pixel = texcoord.x; // + texcoord.y / 1024;

	Color = texel + vec4(texcoord,1.0); // + vec4( reinhard(texel.xyz+vec3(10*pixel)), 1.0);
}
