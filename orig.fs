varying highp vec3 vLightWeighting;
void main() {
	gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
	highp vec3 vNew = vec3(1.0, 1.0, 1.0);
	gl_FragColor = vec4(vLightWeighting, 1.0);
}