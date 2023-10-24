#version 300 es
precision mediump float;

#define STATIC_TIME 1.
#define PI 3.1415

uniform vec2 resolution;
uniform float iTime;

out vec4 outputColor;

float plot(vec2 st, float pct) {
    return smoothstep(pct -.02, pct, st.y) - smoothstep( pct, pct+.02, st.y);
}

void main() {
    // -1, 1
    vec2 uv = (gl_FragCoord.xy * 2. - resolution) / resolution.y;
    // 0, 1
//    vec2 uv = gl_FragCoord.xy / resolution.y;
    uv *= 1.1;
    uv += vec2(0.,-0.05);

    // https://thebookofshaders.com/05/kynd.png
//    float y = 1. - pow(abs(uv.x), 2.5 - sin(iTime)*2.);
//    float y = pow(cos(PI * uv.x / 2.), 2.5 - sin(iTime)*2.);
//    float y = 1. - pow(abs(sin(PI * uv.x / 2.)), 2.5 - sin(iTime)*2.);
//    float y = pow(min(cos(PI * uv.x / 2.), 1. - abs(uv.x)), 2.5 - sin(iTime)*2.);
    float y = 1. - pow(max(0., abs(uv.x) * 2. - 1.), 2.5 - sin(iTime)*2.);

    vec3 color = vec3(y - .3);


    float pct = plot(uv,y);
    color = (1. - pct) * color + pct * vec3(0.,1.,0.);

    outputColor = vec4(color,1.);
}
