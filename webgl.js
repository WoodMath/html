var canvas;
var gl;

var vbVertexBuffer;
var fVertices = [
				 // front face
				 -0.5, -0.5, 0.5,
				 0.5, -0.5, 0.5,
				 -0.5, 0.5, 0.5,
				 0.5, 0.5, 0.5,
				 
				 // up face
				 -0.5, 0.5, -0.5,
				 0.5, 0.5, -0.5,
				 
				 // right face
				 0.5, 0.5, 0.5,
				 0.5, -0.5, -0.5,
				 0.5, -0.5, 0.5,
				 
				 // down face
				 -0.5, -0.5, 0.5,
				 0.5, -0.5, -0.5,
				 -0.5, -0.5, -0.5,
				 
				 // back face
				 0.5, 0.5, -0.5,
				 -0.5, 0.5, -0.5,
				 -0.5, -0.5, -0.5,
				 
				 // left face
				 -0.5, -0.5, 0.5,
				 -0.5, 0.5, -0.5,
				 -0.5, 0.5, 0.5
				 
				 ];

var fNormals = [
				// front face
				0.0, 0.0, 1.0,
				0.0, 0.0, 1.0,
				0.0, 0.0, 1.0,
				0.0, 0.0, 1.0,
				
				// up face
				0.0, 1.0, 0.0,
				0.0, 1.0, 0.0,
				
				// right face
				1.0, 0.0, 0.0,
				1.0, 0.0, 0.0,
				1.0, 0.0, 0.0,
				
				// down face
				0.0, -1.0, 0.0,
				0.0, -1.0, 0.0,
				0.0, -1.0, 0.0,
				
				// back face
				0.0, 0.0, -1.0,
				0.0, 0.0, -1.0,
				0.0, 0.0, -1.0,
				
				// left face
				-1.0, 0.0, 0.0,
				-1.0, 0.0, 0.0,
				-1.0, 0.0, 0.0
				
				];

var v3translate = [0.0, 0.0, 0.0];

var pMatrix;
var mvMatrix;

var sVs =
"attribute vec3 aPos;" +
"uniform vec3 uTrans;" +
"uniform mat3 uProj;" +
"void main() {" +
"	gl_Position = vec4(aPos, 1.0) + vec4(uTrans, 0.0);" +
//	"	gl_Position = vec4(aPos, 1.0);" +
"}";

var sFs =
"void main() {"+
"	gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);"+
"}";


var vs, fs;
var shaderProgram;
var pos;
var trans;
var proj;

function mouseMovement(e){
	var clientCenterX = canvas.clientWidth/2;
	var clientCenterY = canvas.clientHeight/2;
	v3translate[0] = (e.clientX - clientCenterX)/clientCenterX;
	v3translate[1] = (clientCenterY - e.clientY)/clientCenterY;
	//	console.log('v3translate[0] = ' + v3translate[0] + ' ; v3translate[1] = ' + v3translate[1]);
	draw();
	
}

function draw() {
	
	gl.clearColor(0, 0.0, 0.0, 1);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	
	
	mat4.perspective(pMatrix, 30, gl.viewportWidth / gl.viewportHeight, -0.1, 5.0);
	
	
	
 
	gl.useProgram(shaderProgram);
	
	gl.uniform3fv(trans,v3translate);
	gl.uniformMatrix3fv(proj,false,pMatrix);
	
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, vbVertexBuffer.numItems);
}


function initGL() {
	try {
		canvas = document.getElementById("webgl_canvas");		// this lets us know WHERE we are rendering
		gl = canvas.getContext("experimental-webgl");			// this lets us know WHAT we are rendering (WebGL as opposed to some other protocol)
		
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
		
		gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
		
		canvas.addEventListener( 'mousemove', mouseMovement, false );
		
	} catch(e) {
		
		if (!gl) {
			alert("Could not initialise WebGL, sorry :-( ");
		}
	}
}

function initShaders(){
	
	
	// create shader program (shaderProgram)
	shaderProgram = gl.createProgram();
	
	// create VERTEX shader program (vs)
	vs = gl.createShader(gl.VERTEX_SHADER)
	// add VERTEX shader string (sVs) to shader program (vs)
	gl.shaderSource(vs, sVs);
	gl.compileShader(vs);
	if(!gl.getShaderParameter(vs, gl.COMPILE_STATUS))
		throw "Could not compile " + "vertex" + " shader: \n\n" + gl.getShaderInfoLog(vs);
	// attach VERTEX shader to program
	gl.attachShader(shaderProgram, vs);
	
	// create FRAGMENT shader program (fs)
	fs = gl.createShader(gl.FRAGMENT_SHADER);
	// add FRAGMENT shader string (sFs) to shader program (fs)
	gl.shaderSource(fs, sFs);
	gl.compileShader(fs);
	if(!gl.getShaderParameter(fs, gl.COMPILE_STATUS))
		throw "Could not compile " + "fragment" + " shader: \n\n" + gl.getShaderInfoLog(fs);
	// attach FRAGMENT shader to program
	gl.attachShader(shaderProgram, fs);
	
	
	
	// send shader program to GPU
	gl.linkProgram(shaderProgram);
	
	
}

function initBuffers(){
	vbVertexBuffer = gl.createBuffer();
	
	// Make vertex buffer (vbVertexBuffer) active
	gl.bindBuffer(gl.ARRAY_BUFFER, vbVertexBuffer);
	// Bind (Float32 converted) vertex array (vertices) to active vertex buffer (vbVertexBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(fVertices), gl.STATIC_DRAW);
	
	
	vbVertexBuffer.numItems = fVertices.length / 3;	// 4 vectors in vertex buffer
	vbVertexBuffer.itemSize = 3;	// 3 elements in size each
	
	// create ATTRIBUTE variable, and assign shader attribute (aPos) to it
	pos = gl.getAttribLocation(shaderProgram, "aPos");
	// enable addtribute variable (pos) when rendering
	gl.enableVertexAttribArray(pos);
	// specifies location (attr) of current vertex attributes (vbVertexBuffer)
	gl.vertexAttribPointer(pos, vbVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	
	
	// create UNIFORM variable, and assign shader uniform (uTrans) to it
	trans = gl.getUniformLocation(shaderProgram, "uTrans");
	
	proj = gl.getUniformLocation(shaderProgram, "uProj");
	
}

function resetBuffers(){
	gl.deleteBuffer(vbVertexBuffer);
}

function resetShaders(){
	gl.deleteProgram(shaderProgram);
	gl.deleteShader(vs);
	gl.deleteShader(fs);
}

function resetAll(){
	resetBuffers();
	resetShaders();
	initShaders();
	initBuffers();
	draw();
	
}

function WebGLStart(){
	
	
	pMatrix = mat4.create();
	mvMatrix = mat4.create();
	
	initGL();
	initShaders();
	initBuffers();
	
	draw();
	
	
}
