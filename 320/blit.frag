#version 150 core

uniform sampler2D tex;
uniform vec4 params;

in vec2 texcoord;

out vec4 Color;

void main()
{
	float pixel = (1.0 + sin(3.14 * texcoord.x * 16.0))*0.25 + (1.0 + cos(3.14 * texcoord.y * 16.0))*0.25;

	vec4 clr = vec4(vec3(pixel), 1.0);

	Color = clr;
}
