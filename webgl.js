var canvas;
var gl;


var vbVertexBuffer, vbNormalBuffer;

var objRender = new Geom();

/*
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
*/

objRender.data_type = WebGLRenderingContext.TRIANGLES;

objRender.vertex_data = [
/*
						 // front face
						 -0.5,-0.5, 0.5,
						 -0.5, 0.5, 0.5,
						  0.5,-0.5, 0.5,
						  0.5,-0.5, 0.5,
						 -0.5, 0.5, 0.5,
						  0.5, 0.5, 0.5,
						 // back face
						 -0.5,-0.5,-0.5,
						  0.5,-0.5,-0.5,
						 -0.5, 0.5,-0.5,
						 -0.5, 0.5,-0.5,
						  0.5,-0.5,-0.5,
						  0.5, 0.5,-0.5,
						 
						 // up face
						 -0.5, 0.5,-0.5,
						 -0.5, 0.5, 0.5,
						  0.5, 0.5,-0.5,
						  0.5, 0.5,-0.5,
						 -0.5, 0.5, 0.5,
						  0.5, 0.5, 0.5,
						 // down face
						 -0.5,-0.5,-0.5,
						  0.5,-0.5,-0.5,
						 -0.5,-0.5, 0.5,
						 -0.5,-0.5, 0.5,
						  0.5,-0.5,-0.5,
						  0.5,-0.5, 0.5,

						 // right face
						  0.5,-0.5,-0.5,
						  0.5,-0.5, 0.5,
						  0.5, 0.5,-0.5,
						  0.5, 0.5,-0.5,
						  0.5,-0.5, 0.5,
						  0.5, 0.5, 0.5,
						 // left face
						 -0.5,-0.5,-0.5,
						 -0.5, 0.5,-0.5,
						 -0.5,-0.5, 0.5,
						 -0.5,-0.5, 0.5,
						 -0.5, 0.5,-0.5,
						 -0.5, 0.5, 0.5
*/
/*
						 // front face
						 -0.5,-0.5, 0.5,
						  0.5,-0.5, 0.5,
						 -0.5, 0.5, 0.5,
						  0.5,-0.5, 0.5,
						  0.5, 0.5, 0.5,
						 -0.5, 0.5, 0.5,

						 // back face
						 -0.5,-0.5,-0.5,
						 -0.5, 0.5,-0.5,
						  0.5,-0.5,-0.5,
						 -0.5, 0.5,-0.5,
						  0.5, 0.5,-0.5,
						  0.5,-0.5,-0.5,
						 
						 // up face
						 -0.5, 0.5,-0.5,
						  0.5, 0.5,-0.5,
						 -0.5, 0.5, 0.5,
						  0.5, 0.5,-0.5,
						  0.5, 0.5, 0.5,
						 -0.5, 0.5, 0.5,

						 // down face
						 -0.5,-0.5,-0.5,
						 -0.5,-0.5, 0.5,
						  0.5,-0.5,-0.5,
						 -0.5,-0.5, 0.5,
						  0.5,-0.5, 0.5,
						  0.5,-0.5,-0.5,
						 
						 // right face
						  0.5,-0.5,-0.5,
						  0.5, 0.5,-0.5,
						  0.5,-0.5, 0.5,
						  0.5, 0.5,-0.5,
						  0.5, 0.5, 0.5,
						  0.5,-0.5, 0.5,

						 // left face
						 -0.5,-0.5,-0.5,
						 -0.5,-0.5, 0.5,
						 -0.5, 0.5,-0.5,
						 -0.5,-0.5, 0.5,
						 -0.5, 0.5, 0.5,
						 -0.5, 0.5,-0.5
*/
///*
						 // front face
						 -1.0,-1.0, 1.0,
						 -1.0, 1.0, 1.0,
						  1.0,-1.0, 1.0,
						  1.0,-1.0, 1.0,
						 -1.0, 1.0, 1.0,
						  1.0, 1.0, 1.0,
						 // back face
						 -1.0,-1.0,-1.0,
						  1.0,-1.0,-1.0,
						 -1.0, 1.0,-1.0,
						 -1.0, 1.0,-1.0,
						  1.0,-1.0,-1.0,
						  1.0, 1.0,-1.0,
						 
						 // up face
						 -1.0, 1.0,-1.0,
						 -1.0, 1.0, 1.0,
						  1.0, 1.0,-1.0,
						  1.0, 1.0,-1.0,
						 -1.0, 1.0, 1.0,
						  1.0, 1.0, 1.0,
						 // down face
						 -1.0,-1.0,-1.0,
						  1.0,-1.0,-1.0,
						 -1.0,-1.0, 1.0,
						 -1.0,-1.0, 1.0,
						  1.0,-1.0,-1.0,
						  1.0,-1.0, 1.0,
						 
						 // right face
						  1.0,-1.0,-1.0,
						  1.0,-1.0, 1.0,
						  1.0, 1.0,-1.0,
						  1.0, 1.0,-1.0,
						  1.0,-1.0, 1.0,
						  1.0, 1.0, 1.0,
						 // left face
						 -1.0,-1.0,-1.0,
						 -1.0, 1.0,-1.0,
						 -1.0,-1.0, 1.0,
						 -1.0,-1.0, 1.0,
						 -1.0, 1.0,-1.0,
						 -1.0, 1.0, 1.0
//*/
						 ];

objRender.normal_data = [
/*
						 // front face
						  0.0, 0.0,-1.0,
						  0.0, 0.0,-1.0,
						  0.0, 0.0,-1.0,
						  0.0, 0.0,-1.0,
						  0.0, 0.0,-1.0,
						  0.0, 0.0,-1.0,
						 // back face
						  0.0, 0.0, 1.0,
						  0.0, 0.0, 1.0,
						  0.0, 0.0, 1.0,
						  0.0, 0.0, 1.0,
						  0.0, 0.0, 1.0,
						  0.0, 0.0, 1.0,

						 // up face
						  0.0,-1.0, 0.0,
						  0.0,-1.0, 0.0,
						  0.0,-1.0, 0.0,
						  0.0,-1.0, 0.0,
						  0.0,-1.0, 0.0,
						  0.0,-1.0, 0.0,
						 // down face
						  0.0, 1.0, 0.0,
						  0.0, 1.0, 0.0,
						  0.0, 1.0, 0.0,
						  0.0, 1.0, 0.0,
						  0.0, 1.0, 0.0,
						  0.0, 1.0, 0.0,

						 // right face
						 -1.0, 0.0, 0.0,
						 -1.0, 0.0, 0.0,
						 -1.0, 0.0, 0.0,
						 -1.0, 0.0, 0.0,
						 -1.0, 0.0, 0.0,
						 -1.0, 0.0, 0.0,
						 // left face
						  1.0, 0.0, 0.0,
						  1.0, 0.0, 0.0,
						  1.0, 0.0, 0.0,
						  1.0, 0.0, 0.0,
						  1.0, 0.0, 0.0,
						  1.0, 0.0, 0.0
*/

						 // front face
						  0.0, 0.0, 1.0,
						  0.0, 0.0, 1.0,
						  0.0, 0.0, 1.0,
						  0.0, 0.0, 1.0,
						  0.0, 0.0, 1.0,
						  0.0, 0.0, 1.0,
						 // back face
						  0.0, 0.0,-1.0,
						  0.0, 0.0,-1.0,
						  0.0, 0.0,-1.0,
						  0.0, 0.0,-1.0,
						  0.0, 0.0,-1.0,
						  0.0, 0.0,-1.0,

						 // up face
						  0.0, 1.0, 0.0,
						  0.0, 1.0, 0.0,
						  0.0, 1.0, 0.0,
						  0.0, 1.0, 0.0,
						  0.0, 1.0, 0.0,
						  0.0, 1.0, 0.0,
						 // down face
						  0.0,-1.0, 0.0,
						  0.0,-1.0, 0.0,
						  0.0,-1.0, 0.0,
						  0.0,-1.0, 0.0,
						  0.0,-1.0, 0.0,
						  0.0,-1.0, 0.0,
						 
						 // right face
						  1.0, 0.0, 0.0,
						  1.0, 0.0, 0.0,
						  1.0, 0.0, 0.0,
						  1.0, 0.0, 0.0,
						  1.0, 0.0, 0.0,
						  1.0, 0.0, 0.0,
						 // left face
						 -1.0, 0.0, 0.0,
						 -1.0, 0.0, 0.0,
						 -1.0, 0.0, 0.0,
						 -1.0, 0.0, 0.0,
						 -1.0, 0.0, 0.0,
						 -1.0, 0.0, 0.0
						 
						 ];

/*
	Based on code from:
		http://learningwebgl.com/blog/?p=684
*/
var sVs =
"varying highp vec3 vLightWeighting;" +
"attribute vec3 aPos;" +
"attribute vec3 aNorm;" +
"uniform vec3 uLight;" +
"uniform vec3 uColor;" +
"uniform mat4 uProj;" +
"uniform mat4 uMove;" +
"uniform mat4 uNorm;" +
"uniform mat4 uChange;" +
"void main() {" +
"	gl_Position = uProj * uMove * vec4(aPos, 1.0) ; " +
"	highp vec4 v4LightPos = uMove * vec4(aPos, 1.0) ; " +
"	gl_Position = uChange * uProj * uMove * vec4(aPos, 1.0) ; " +
"	vec4 vTransformedNormal = uNorm * vec4(aNorm, 1.0) ; " +
"	highp vec3 vDirectional = 1.0*(uLight - v4LightPos.xyz) ; " +
"	highp float fWeighting = max(dot(normalize(vTransformedNormal.xyz), normalize(vDirectional)),0.0) ; " +
"	vLightWeighting = uColor*0.5 + uColor * fWeighting ; " +
"}";

var sFs =
"varying highp vec3 vLightWeighting;" +
"void main() {" +
"	gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);" +
"	highp vec3 vNew = vec3(1.0, 1.0, 1.0);" +
"	gl_FragColor = vec4(vLightWeighting, 1.0);" +
"}";


var vs, fs;
var shaderProgram;
var aPos, aNorm;
var pMatrix, mvMatrix;
var uProj, uMove;
var tMatrix, tempMatrix;
var normMatrix;
var uNorm, uLight, uPos;
var uChange;

var v3light = [0.0, 0.0, 5.0];
var v3color = [0.0, 1.0, 0.0];
var v3translate = [0.0, 0.0, -5.0];
var m4change =
				[-1.0, 0.0, 0.0, 0.0,
				  0.0,-1.0, 0.0, 0.0,
				  0.0, 0.0,-1.0, 0.0,
				  0.0, 0.0, 0.0, 1.0];
var m4identity =
				[ 1.0, 0.0, 0.0, 0.0,
				  0.0, 1.0, 0.0, 0.0,
				  0.0, 0.0, 1.0, 0.0,
				  0.0, 0.0, 0.0, 1.0];


function mouseMovement(e){
	var fSwitch = 5.0;
/*
	'fSwitch' dictates movement of 'v3translate' vector based upon matrix mordering
		fSwitch = -1.0 when gl_Position = uProj * uMove * vec4(aPos, 1.0) ;
		fSwitch =  1.0 when gl_Position = uMove * uProj * vec4(aPos, 1.0) ;
 
*/
	var clientCenterX = canvas.clientWidth/2;
	var clientCenterY = canvas.clientHeight/2;
	v3translate[0] = ((e.clientX - this.offsetLeft) - clientCenterX)/clientCenterX * fSwitch;		// is LR
	v3translate[1] = (clientCenterY - (e.clientY - this.offsetTop))/clientCenterY * fSwitch;		// is TD
//	v3translate[2] = ((e.clientY  - this.offsetTop) - clientCenterY)*0.1;
	
//	v3translate[2] = 0;


	draw();
	
}



function draw() {

	mvMatrix = mat4.translate(mvMatrix, mat4.identity(mat4.create()), v3translate);
//	console.log('v3translate[0] = ' + v3translate[0] + ' ; v3translate[1] = ' + v3translate[1] + ' ; v3translate[2] = ' + v3translate[2]);
	
	
//	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	

 
	gl.useProgram(shaderProgram);
	

//	tMatrix = mat3.normalFromMat4(mat3.create(), mvMatrix);
	normMatrix = mat4FromMat3(mat4.create(), mat3.normalFromMat4(mat3.create(), mvMatrix));
	
//	tMatrix = mat4.transpose(mat4.create(), pMatrix);
//	tMatrix = mat4FromMat3(mat4.create(), mat3.normalFromMat4(mat3.create(), mvMatrix));
	
	
	gl.uniform3fv(uLight,v3light);
	gl.uniform3fv(uColor,v3color);
	
	gl.uniformMatrix4fv(uProj,false,pMatrix);
	gl.uniformMatrix4fv(uMove,false,mvMatrix);
	gl.uniformMatrix4fv(uNorm,false,normMatrix);

	gl.uniformMatrix4fv(uChange,false,m4identity);
	
	gl.drawArrays(objRender.data_type, 0, vbVertexBuffer.numItems);
}


function initGL() {
	try {
		canvas = document.getElementById("webgl_canvas");		// this lets us know WHERE we are rendering
		gl = canvas.getContext("experimental-webgl");			// this lets us know WHAT we are rendering (WebGL as opposed to some other protocol)
		
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
		
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clearDepth(20.0);
//		gl.depthMask(true);
		gl.enable(gl.BLEND);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
//		gl.depthFunc(gl.NONE);

//		gl.depthFunc(gl.LESS);
//		gl.disable(gl.DEPTH_TEST);
		
		canvas.addEventListener( 'mousemove', mouseMovement, false );
		
		mvMatrix = mat4.create();
		mvMatrix = mat4.identity(mvMatrix);
		mvMatrix = mat4.translate(mvMatrix, mat4.identity(mat4.create()), v3translate);
		
		pMatrix = mat4.create();
		pMatrix = mat4.identity(pMatrix);
		pMatrix = mat4.perspective(pMatrix, Math.PI/180.0*90.0, gl.viewportWidth / gl.viewportHeight, 0.01, 5.01);

		gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

		
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
	
	// tell what shder program on the GPU to use
	gl.useProgram(shaderProgram);
	
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
	aPos = gl.getAttribLocation(shaderProgram, "aPos");
	// enable addtribute variable (aPos) when rendering
	gl.enableVertexAttribArray(aPos);
	// specifies location (aPos) of current vertex attributes (vbVertexBuffer)
	gl.vertexAttribPointer(aPos, vbVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	

	
	
	
	vbNormalBuffer.numItems = objRender.numVectors();	// 4 vectors in vertex buffer
	vbNormalBuffer.itemSize = 3;						// 3 elements in size each
	
	// Make vertex buffer (vbNormalBuffer) active
	gl.bindBuffer(gl.ARRAY_BUFFER, vbNormalBuffer);
	// Bind (Float32 converted) vertex array (objRender.normal_data) to active vertex buffer (vbNormalBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objRender.normal_data), gl.STATIC_DRAW);
	
	// create ATTRIBUTE variable, and assign shader attribute (aNorm) to it
	aNorm = gl.getAttribLocation(shaderProgram, "aNorm");
	// enable addtribute variable (aNorm) when rendering
	gl.enableVertexAttribArray(aNorm);
	// specifies location (aNorm) of current vertex attributes (vbVertexBuffer)
	gl.vertexAttribPointer(aNorm, vbVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	
	
	
	
	
	// create UNIFORM variable, and assign shader uniform (uLight) to it
	uLight = gl.getUniformLocation(shaderProgram, "uLight");
	uColor = gl.getUniformLocation(shaderProgram, "uColor");

	// create UNIFORM variable, and assign shader uniform (uProj, uMove, and uNorm) to it
	uProj = gl.getUniformLocation(shaderProgram, "uProj");
	uMove = gl.getUniformLocation(shaderProgram, "uMove");
	uNorm = gl.getUniformLocation(shaderProgram, "uNorm");
	uChange = gl.getUniformLocation(shaderProgram, "uChange");
	
	
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

function loadParametric(sFunction){
	var obj = new Geom();

/*
	Implementing callbacks based on
		https://developer.mozilla.org/en-US/docs/Mozilla/js-ctypes/Using_js-ctypes/Declaring_and_Using_Callbacks
 
*/
	if(sFunction === "sphere")
		obj.evaluate(
			sphere,							// callback
			0.0, 360.0, 5.0,				// U-Parameterization (Min, Max, Step)	(Longitude)
			0.0, 180.0, 5.0,				// V-Parameterization (Min, Max, Step)	(Degrees from South-Pole)
			1.0, "empty"					// function parameters (radius and dummy)
		);

	if(sFunction === "torus")
		obj.evaluate(
			torus,							// callback
			0.0, 360.0, 5.0,				// U-Parameterization (Min, Max, Step)	(Along the tube)
			0.0, 360.0, 5.0,				// V-Parameterization (Min, Max, Step)	(Degrees from South-Pole)
			1.0, 2.0						// function parameters (radius and dummy)
		 );
	
	if(sFunction === "square")
		obj.evaluate(
			square,							// callback
			0.0, 1.0, 0.1,					// U-Parameterization (Min, Max, Step)	(Along the horizontal of the square)
			0.0, 1.0, 0.1,					// V-Parameterization (Min, Max, Step)	(Along the vertical of the square)
			-0.5, 0.5						// function parameters (starting from and stopping at)
		);

	if(sFUnction === "box")
		obj.evaluate(
			box,							// callback
			0.0, 1.0, 0.1*(1.0/4.0),		// U-Parameterization (Min, Max, Step)	(Along the horizontal of the cube map)
			0.0, 1.0, 0.1*(1.0/3.0),		// V-Parameterization (Min, Max, Step)	(Along the vertical of the cube map)
			1.0, -1.0/2.0					// function parameters (size and centerinf offset)
		);

	objRender = obj;
	resetBuffers();
	initBuffers();
	draw();
	
	
}

function WebGLStart(){
	
	

	
	initGL();
	initShaders();
	initBuffers();
	
	draw();
	
	
}
