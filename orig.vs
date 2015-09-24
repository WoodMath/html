varying highp vec3 vLightWeighting;
attribute vec3 aPos;
attribute vec3 aNorm;
uniform vec3 uLight;
uniform vec3 uColor;
uniform mat4 uProj;
uniform mat4 uMove;
uniform mat4 uNorm;
uniform mat4 uChange;
void main() {
	gl_Position = uProj * uMove * vec4(aPos, 1.0) ; 
	highp vec4 v4LightPos = uMove * vec4(aPos, 1.0) ; 
	gl_Position = uChange * uProj * uMove * vec4(aPos, 1.0) ; 
	vec4 vTransformedNormal = uNorm * vec4(aNorm, 1.0) ; 
	highp vec3 vDirectional = 1.0*(uLight - v4LightPos.xyz) ; 
	highp float fWeighting = max(dot(normalize(vTransformedNormal.xyz), normalize(vDirectional)),0.0) ; 
	vLightWeighting = uColor*0.5 + uColor * fWeighting ; 
}