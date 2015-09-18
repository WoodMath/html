attribute vec3 aPos;
uniform vec3 uTrans;
//uniform mat3 uProj;
void main() {
/*	test	*/
//	gl_Position = vec4(aPos, 1.0) + vec4(uTrans, 0.0);
	gl_Position = vec4(aPos, 1.0);
}
