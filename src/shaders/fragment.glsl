#version 300 es
precision mediump float;

#define STATIC_TIME 1.

uniform vec2 resolution;
uniform float iTime;

out vec4 outputColor;

// https://iquilezles.org/articles/palettes/
vec3 pallete( float t) {
    vec3 a = vec3(.0,.5,.5);
    vec3 b = vec3(.0,.5,.5);
    vec3 c = vec3(.0,.668,.628);
    vec3 d = vec3(0.,.857,1.);
    return a + b*cos(6.28318*(c*t+d) );
}


void main() {
    vec2 uv = (gl_FragCoord.xy * 2. - resolution) / resolution.y;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.);


    for(float i = 0.; i< 3.; i++){
        uv = fract(uv*1.5) -.5;

        float d = length(uv) * exp(-length(uv0));

        vec3 col = pallete(length(uv0) + i*.4 + STATIC_TIME * .4);

        d = sin(d*8. + STATIC_TIME)/8.;
        d = abs(d);

        d = 0.01/d;

        d = pow(d,1.5);

        d = step(1.,d);

        finalColor += col * d;
    }

    outputColor = vec4(vec3(finalColor),1.);
}
