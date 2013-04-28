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

vec4 blur()
{
    float _c = 1.0/1024.0;

    vec4 c = texture(fb, texcoord.xy);

    vec4 c0 = texture(fb, texcoord.xy + vec2(0, 1) * _c);
    vec4 c1 = texture(fb, texcoord.xy + vec2(0,-1) * _c);
    vec4 c2 = texture(fb, texcoord.xy + vec2(-1,0) * _c);
    vec4 c3 = texture(fb, texcoord.xy + vec2( 1,0) * _c);

    return (c + c0 + c1 + c2 + c3) * 0.25; 
}

#define KERNEL_SIZE 9

float convolutionKernel[KERNEL_SIZE] = float[]( 1.0, 2.0, 1.0
                                              , 2.0, 4.0, 2.0
                                              , 1.0, 2.0, 1.0 
                                              );

const float stepX = 1.0/1024.0;
const float stepY = 1.0/720.0;

const vec2 convolutionKernelOffsets[KERNEL_SIZE] = vec2[]( vec2(-stepX, -stepY), vec2(0.0, -stepY), vec2(stepX, -stepY)
                                                         , vec2(-stepX, 0), vec2(0.0, 0.0), vec2(stepX, 0)
                                                         , vec2(-stepX, stepY), vec2(0.0, stepY), vec2(stepX, stepY)
                                                   );

vec4 convolution9(in sampler2D tex, in vec2 anchor)
{
    vec4 sum = vec4(0.0);

    for(int i=0; i<KERNEL_SIZE; i++)
    {
        vec4 tmp = texture(tex, anchor + 0.5 * convolutionKernelOffsets[i]);
        sum += tmp * convolutionKernel[i];
    }

    return sum; // * (1.0/9.0);
}

void main()
{
	float pixel = (1.0 + sin(3.14 * texcoord.x * 2.0))*0.25 + (1.0 + cos(3.14 * texcoord.y * 2.0))*0.25;

    vec4 texel = texture(fb,texcoord.xy);
    //pixel = texcoord.x; // + texcoord.y / 1024;

    //vec4 texel = convolution9(fb, texcoord.xy);

    vec3 tonemappedPixel = tonemap(1.0 * texel.xyz);
	Color = vec4(tonemappedPixel, 1.0); // + 0.2 * vec4(texcoord,1.0); // + vec4( reinhard(texel.xyz+vec3(10*pixel)), 1.0);

    //gl_FragDepth = 1.0;
}
