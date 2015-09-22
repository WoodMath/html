attribute vec3 aPos;
attribute vec3 aNorm;
uniform vec3 uTrans;
uniform vec3 uRotn;
uniform mat4 uProj;
uniform mat4 uMove;
varying lowp vec3 vDummy;
void main() {
	gl_Position = vec4(aPos, 1.0) + vec4(uTrans, 0.0);
	gl_Position = uProj * uMove * vec4(aPos, 1.0) ;
	vDummy = aNorm;
}
