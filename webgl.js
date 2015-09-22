var canvas;
var gl;


var vbVertexBuffer, vbNormalBuffer;

var objRender = new Geom();
objRender.data_type = WebGLRenderingContext.TRIANGLE_STRIP;
objRender.vertex_data = [
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

objRender.normal_data = [
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



var sVs =
"attribute vec3 aPos;" +
"attribute vec3 aNorm;" +
"uniform vec3 uTrans;" +
"uniform vec3 uRotn;" +
"uniform mat4 uProj;" +
"uniform mat4 uMove;" +
"varying lowp vec3 vDummy;" +
"void main() {" +
"	gl_Position = vec4(aPos, 1.0) + vec4(uTrans, 0.0);" +
"	gl_Position = uProj * uMove * vec4(aPos, 1.0) ; " +
"	vDummy = aNorm;" +
"}";

var sFs =
"varying lowp vec3 vDummy;" +
"void main() {" +
"	gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);" +
"	lowp vec3 vNew = vec3(1.0, 1.0, 1.0);" +
"}";


var vs, fs;
var shaderProgram;
var pos, norm;
var pMatrix, mvMatrix;
var uProj, uMove;
var tMatrix, tempMatrix;
function mouseMovement(e){
	var fSwitch = -1.0;
/*
	'fSwitch' dictates movement of 'v3translate' vector based upon matrix mordering
		fSwitch = -1.0 when gl_Position = uProj * uMove * vec4(aPos, 1.0) ;
		fSwitch =  1.0 when gl_Position = uMove * uProj * vec4(aPos, 1.0) ;
 
*/
	var clientCenterX = canvas.clientWidth/2;
	var clientCenterY = canvas.clientHeight/2;
	v3translate[0] = (e.clientX - this.offsetLeft - clientCenterX)/clientCenterX * fSwitch;
	v3translate[1] = (clientCenterY - e.clientY + this.offsetTop)/clientCenterY * fSwitch;
	v3translate[2] = 0;
	//	console.log('v3translate[0] = ' + v3translate[0] + ' ; v3translate[1] = ' + v3translate[1]);
	mvMatrix = mat4.translate(mvMatrix, mat4.identity(mat4.create()), v3translate);

	draw();
	
}

function draw() {
	
	gl.clearColor(0, 0.0, 0.0, 1);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	
	
	
	
 
	gl.useProgram(shaderProgram);
	
	gl.uniform3fv(trans,v3translate);
	
/*
	tempMatrix = mat3.create();
	tempMatrix = mat3.normalFromMat4(tempMatrix,pMatrix);
	tMatrix = mat4.create();
	tMatrix = mat4FromMat3(tMatrix, tempMatrix);
	tMatrix = mat4.transpose(tMatrix, pMatrix);
*/	
	tMatrix = mat4.transpose(mat4.create(), pMatrix);
	
	gl.uniformMatrix4fv(uProj,false,tMatrix);
	gl.uniformMatrix4fv(uMove,false,mvMatrix);
	
	gl.drawArrays(objRender.data_type, 0, vbVertexBuffer.numItems);
}


function initGL() {
	try {
		canvas = document.getElementById("webgl_canvas");		// this lets us know WHERE we are rendering
		gl = canvas.getContext("experimental-webgl");			// this lets us know WHAT we are rendering (WebGL as opposed to some other protocol)
		
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
		
		
		canvas.addEventListener( 'mousemove', mouseMovement, false );
		
		pMatrix = mat4.create();
		pMatrix = mat4.identity(pMatrix);
		pMatrix = mat4.perspective(pMatrix, 30, gl.viewportWidth / gl.viewportHeight, 5.0, -5.0);

		gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

		mvMatrix = mat4.create();
		mvMatrix = mat4.identity(mat4.create());
		mvMatrix = mat4.translate(mvMatrix, mat4.identity(mat4.create()), v3translate);
		
		
		
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
	vbNormalBuffer = gl.createBuffer();
	
	
	vbVertexBuffer.numItems = objRender.numVectors();	// 4 vectors in vertex buffer
	vbVertexBuffer.itemSize = 3;	// 3 elements in size each

	// Make vertex buffer (vbVertexBuffer) active
	gl.bindBuffer(gl.ARRAY_BUFFER, vbVertexBuffer);
	// Bind (Float32 converted) vertex array (objRender.vertex_data) to active vertex buffer (vbVertexBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objRender.vertex_data), gl.STATIC_DRAW);
	
	// create ATTRIBUTE variable, and assign shader attribute (aPos) to it
	pos = gl.getAttribLocation(shaderProgram, "aPos");
	// enable addtribute variable (pos) when rendering
	gl.enableVertexAttribArray(pos);
	// specifies location (attr) of current vertex attributes (vbVertexBuffer)
	gl.vertexAttribPointer(pos, vbVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	
	
	
	vbNormalBuffer.numItems = objRender.numVectors();	// 4 vectors in vertex buffer
	vbNormalBuffer.itemSize = 3;	// 3 elements in size each
	
	// Make vertex buffer (vbNormalBuffer) active
	gl.bindBuffer(gl.ARRAY_BUFFER, vbNormalBuffer);
	// Bind (Float32 converted) vertex array (objRender.normal_data) to active vertex buffer (vbNormalBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objRender.normal_data), gl.STATIC_DRAW);
	
	// create ATTRIBUTE variable, and assign shader attribute (aNorm) to it
	norm = gl.getAttribLocation(shaderProgram, "aNorm");
	// enable addtribute variable (norm) when rendering
	gl.enableVertexAttribArray(norm);
	// specifies location (attr) of current vertex attributes (vbVertexBuffer)
	gl.vertexAttribPointer(norm, vbVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

	// Make vertex buffer (vbVertexBuffer) active
	gl.bindBuffer(gl.ARRAY_BUFFER, vbNormalBuffer);
	// Bind (Float32 converted) vertex array (vertices) to active vertex buffer (vbVertexBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objRender.normal_data), gl.STATIC_DRAW);
	
	
	// create UNIFORM variable, and assign shader uniform (uTrans) to it
	trans = gl.getUniformLocation(shaderProgram, "uTrans");
	
	uProj = gl.getUniformLocation(shaderProgram, "uProj");
	uMove = gl.getUniformLocation(shaderProgram, "uMove");
	
}

function resetBuffers(){
	gl.deleteBuffer(vbVertexBuffer);
	gl.deleteBuffer(vbNormalBuffer);
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
	
	

	
	initGL();
	initShaders();
	initBuffers();
	
	draw();
	
	
}
