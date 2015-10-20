"use strict";	//	Force variable declaration
var canvas;
var gl;


var vbVertexBuffer, vbNormalBuffer, vbUVBuffer;
var ibIndexBuffer;

var objRender = new Geom();



objRender.dataType = WebGLRenderingContext.TRIANGLES;

objRender.vertexData = [
						 // Front face
						 -1.0,-1.0, 1.0,
						 -1.0, 1.0, 1.0,
						  1.0,-1.0, 1.0,
						  1.0,-1.0, 1.0,
						 -1.0, 1.0, 1.0,
						  1.0, 1.0, 1.0,
						 // Back face
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
						 // Down face
						 -1.0,-1.0,-1.0,
						  1.0,-1.0,-1.0,
						 -1.0,-1.0, 1.0,
						 -1.0,-1.0, 1.0,
						  1.0,-1.0,-1.0,
						  1.0,-1.0, 1.0,
						 
						 // Right face
						  1.0,-1.0,-1.0,
						  1.0,-1.0, 1.0,
						  1.0, 1.0,-1.0,
						  1.0, 1.0,-1.0,
						  1.0,-1.0, 1.0,
						  1.0, 1.0, 1.0,
						 // Left face
						 -1.0,-1.0,-1.0,
						 -1.0, 1.0,-1.0,
						 -1.0,-1.0, 1.0,
						 -1.0,-1.0, 1.0,
						 -1.0, 1.0,-1.0,
						 -1.0, 1.0, 1.0
						 ];

objRender.normalData = [
						 // Front face
						  0.0, 0.0, 1.0,
						  0.0, 0.0, 1.0,
						  0.0, 0.0, 1.0,
						  0.0, 0.0, 1.0,
						  0.0, 0.0, 1.0,
						  0.0, 0.0, 1.0,
						 // Back face
						  0.0, 0.0,-1.0,
						  0.0, 0.0,-1.0,
						  0.0, 0.0,-1.0,
						  0.0, 0.0,-1.0,
						  0.0, 0.0,-1.0,
						  0.0, 0.0,-1.0,

						 // Up face
						  0.0, 1.0, 0.0,
						  0.0, 1.0, 0.0,
						  0.0, 1.0, 0.0,
						  0.0, 1.0, 0.0,
						  0.0, 1.0, 0.0,
						  0.0, 1.0, 0.0,
						 // Down face
						  0.0,-1.0, 0.0,
						  0.0,-1.0, 0.0,
						  0.0,-1.0, 0.0,
						  0.0,-1.0, 0.0,
						  0.0,-1.0, 0.0,
						  0.0,-1.0, 0.0,
						 
						 // Right face
						  1.0, 0.0, 0.0,
						  1.0, 0.0, 0.0,
						  1.0, 0.0, 0.0,
						  1.0, 0.0, 0.0,
						  1.0, 0.0, 0.0,
						  1.0, 0.0, 0.0,
						 // Left face
						 -1.0, 0.0, 0.0,
						 -1.0, 0.0, 0.0,
						 -1.0, 0.0, 0.0,
						 -1.0, 0.0, 0.0,
						 -1.0, 0.0, 0.0,
						 -1.0, 0.0, 0.0
						 
						 ];
objRender.uvData = [
						 // Front face
						  0.0, 0.0,
						  0.0, 1.0,
						  1.0, 0.0,
						  1.0, 0.0,
						  0.0, 1.0,
						  1.0, 1.0,
						 // Back face
						  0.0, 0.0,
						  1.0, 0.0,
						  0.0, 1.0,
						  0.0, 1.0,
						  1.0, 0.0,
						  1.0, 1.0,
						 
						 // up face
						  0.0, 0.0,
						  0.0, 1.0,
						  1.0, 0.0,
						  1.0, 0.0,
						  0.0, 1.0,
						  1.0, 1.0,
						 // Down face
						  0.0, 0.0,
						  1.0, 0.0,
						  0.0, 1.0,
						  0.0, 1.0,
						  1.0, 0.0,
						  1.0, 1.0,
						 
						 // Right face
						  0.0, 0.0,
						  0.0, 1.0,
						  1.0, 0.0,
						  1.0, 0.0,
						  0.0, 1.0,
						  1.0, 1.0,
						 // Left face
						  0.0, 0.0,
						  1.0, 0.0,
						  0.0, 1.0,
						  0.0, 1.0,
						  1.0, 0.0,
						  1.0, 1.0
						 ];


objRender.vertexIndices = [
							 0, 1, 2,	 3, 4, 5,		// Front face
							 6, 7, 8,	 9,10,11,		// Back face
							12,13,14,	15,16,17,		// Up face
							18,19,20,	21,22,23,		// Down face
							24,25,26,	27,28,29,		// Right face
							30,31,32,	33,34,35
];

objRender.normalIndices = [
							 0, 1, 2,	 3, 4, 5,		// Front face
							 6, 7, 8,	 9,10,11,		// Back face
							12,13,14,	15,16,17,		// Up face
							18,19,20,	21,22,23,		// Down face
							24,25,26,	27,28,29,		// Right face
							30,31,32,	33,34,35
];

/*
	Based on code from:
		http://learningwebgl.com/blog/?p=684
*/
var sVs =
//"varying highp vec3 vLightWeighting;" +
"varying highp float vLightWeighting;" +
"attribute vec3 aPos;" +
"attribute vec3 aNorm;" +
"attribute vec2 aTexUV;"+
"varying highp vec2 vTexUV;"+
"uniform vec3 uLight;" +
"uniform vec3 uColor;" +
"uniform mat4 uProj;" +
"uniform mat4 uMove;" +
"uniform mat4 uNorm;" +
"uniform mat4 uChange;" +
"uniform sampler2D uSampler;"+
"void main() {" +
"	gl_Position = uProj * uMove * vec4(aPos, 1.0) ; " +
"	highp vec4 v4LightPos = uMove * vec4(aPos, 1.0) ; " +
"	gl_Position = uChange * uProj * uMove * vec4(aPos, 1.0) ; " +
"	vec4 vTransformedNormal = uNorm * vec4(aNorm, 1.0) ; " +
"	highp vec3 vDirectional = 1.0*(uLight - v4LightPos.xyz) ; " +
"	highp float fWeighting = max(dot(normalize(vTransformedNormal.xyz), normalize(vDirectional)),0.0) ; " +
"	vLightWeighting = fWeighting ; " +
"	vTexUV = aTexUV ; " +
"}";

var sFs =
//"varying highp vec3 vLightWeighting ; " +
//"attribute vec2 aTexUV ; " +
"varying highp float vLightWeighting; " +
"uniform highp vec3 uColor ; " +
"uniform sampler2D uSampler ; " +
"varying highp vec2 vTexUV ; " +
"void main() {" +
"	gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0) ; " +
"	highp vec3 vNew = vec3(1.0, 1.0, 1.0) ; " +
//"	highp vec4 vColor = vec4(uColor, 1.0); " +
"	highp vec4 vColor = texture2D(uSampler, vec2(vTexUV.s, vTexUV.t)); " +
"	highp vec4 v4LightWeighting = vColor * 0.5 + vColor * vLightWeighting ; " +
//"	gl_FragColor = vec4(v4LightWeighting, 1.0) ; " +
//"	gl_FragColor = texture2D(uSampler, vec2(vTexUV.s, vTexUV.t)) ; " +
//"	gl_FragColor = vec4(vLightWeighting, 1.0) + texture2D(uSampler, vec2(vTexUV.s, vTexUV.t)) ; " +
"	gl_FragColor = v4LightWeighting ; " +
"}";


var vs, fs;
var shaderProgram;
var aPos, aNorm;
var pMatrix, mvMatrix;
var uProj, uMove;
var tMatrix, tempMatrix;
var normMatrix;
var uNorm, uLight, uPos, uColor;
var uChange;
var texBuffer;
var imgBuffer;
var aTexUV;
var uSampler;

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
	
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.useProgram(shaderProgram);
	


	// Need Normal-Matrix (inverse-transpose of Modelview-matrix)
	// For proper shading of normal faces
	normMatrix = mat4FromMat3(mat4.create(), mat3.normalFromMat4(mat3.create(), mvMatrix));
	
	
	
	gl.uniform3fv(uLight,v3light);
	gl.uniform3fv(uColor,v3color);
	
	gl.uniformMatrix4fv(uProj,false,pMatrix);
	gl.uniformMatrix4fv(uMove,false,mvMatrix);
	gl.uniformMatrix4fv(uNorm,false,normMatrix);

	gl.uniformMatrix4fv(uChange,false,m4identity);

	gl.uniform1i(uSampler, 0);


	
	/*
		Code for index buffers based upon Mozilla documentation at
			https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Creating_3D_objects_using_WebGL
	*/

	/*
	gl.bindBuffer(gl.ARRAY_BUFFER, vbVertexBuffer);
	gl.vertexAttribPointer(aPos, vbVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);  

	gl.bindBuffer(gl.ARRAY_BUFFER, vbNormalBuffer);
	gl.vertexAttribPointer(aNorm, vbNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);  
	*/  
//	gl.drawArrays(objRender.dataType, 0, vbVertexBuffer.numItems);

	//	Index Buffer code below is not implemented for Geom.evaluate
//	/*
	gl.bindBuffer(gl.ARRAY_BUFFER, vbVertexBuffer);
	gl.vertexAttribPointer(aPos, vbVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);  

	gl.bindBuffer(gl.ARRAY_BUFFER, vbNormalBuffer);
	gl.vertexAttribPointer(aNorm, vbNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);  

	gl.bindBuffer(gl.ARRAY_BUFFER, vbUVBuffer);
	gl.vertexAttribPointer(aTexUV, 2, gl.FLOAT, false, 0, 0);


	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texBuffer);
	uSampler = gl.getUniformLocation(shaderProgram, "uSampler");

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibIndexBuffer);
	gl.drawElements(objRender.dataType, ibIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
//	*/


}


function initGL() {
	try {
		canvas = document.getElementById("webgl_canvas");		// this lets us know WHERE we are rendering
		gl = canvas.getContext("experimental-webgl");			// this lets us know WHAT we are rendering (WebGL as opposed to some other protocol)
		
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
		
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clearDepth(20.0);
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
	
		var jMatrix = makePerspective(Math.PI / 180.0 * 90.0 , gl.viewportWidth / gl.viewportHeight, 0.01, 100.0);
		jMatrix = jMatrix.flatten();
	
		var kMatrix = mat4.create();
		kMatrix = mat4.identity(kMatrix);
		kMatrix = mat4.perspective(kMatrix, Math.PI / 180.0 * 90.0, gl.viewportWidth / gl.viewportHeight, 0.01, 100.01);


		// There is a Disconnect between methods being used
		// Read up on how it is calculated
		pMatrix = kMatrix;

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

	/*
		Code for binding 'position' attributes vs 'color' attributes is based loosely on Mozilla documentation at
			https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_shaders_to_apply_color_in_WebGL
	*/
	vbVertexBuffer = gl.createBuffer();
	vbVertexBuffer.numItems = objRender.numVectors();	// 4 vectors in vertex positin buffer
	vbVertexBuffer.itemSize = 3;						// 3 elements in size each

	// Make position vertex buffer (vbVertexBuffer) active
	gl.bindBuffer(gl.ARRAY_BUFFER, vbVertexBuffer);
	// Bind (Float32 converted) vertex array (objRender.vertexData) to active vertex buffer (vbVertexBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objRender.vertexData), gl.STATIC_DRAW);
	
	// create ATTRIBUTE variable, and assign shader attribute (aPos) to it
	aPos = gl.getAttribLocation(shaderProgram, "aPos");
	// enable addtribute variable (aPos) when rendering
	gl.enableVertexAttribArray(aPos);
	// specifies location (aPos) of current vertex attributes (vbVertexBuffer)
	gl.vertexAttribPointer(aPos, vbVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
	
	/*
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	*/
	
	/*
		Code for binding 'color' attributes vs 'position' attributes is based loosely on Mozilla documentation at
			https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_shaders_to_apply_color_in_WebGL
	*/
	
	vbNormalBuffer = gl.createBuffer();
	vbNormalBuffer.numItems = objRender.numVectors();			// 4 vectors in vertex buffer
	vbNormalBuffer.itemSize = 3;						// 3 elements in size each
	
	// Make normal vetex buffer (vbNormalBuffer) active
	gl.bindBuffer(gl.ARRAY_BUFFER, vbNormalBuffer);
	// Bind (Float32 converted) vertex array (objRender.normalData) to active vertex buffer (vbNormalBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objRender.normalData), gl.STATIC_DRAW);
	
	// create ATTRIBUTE variable, and assign shader attribute (aNorm) to it
	aNorm = gl.getAttribLocation(shaderProgram, "aNorm");
	// enable addtribute variable (aNorm) when rendering
	gl.enableVertexAttribArray(aNorm);
	// specifies location (aNorm) of current vertex attributes (vbNormalBuffer)
	gl.vertexAttribPointer(aNorm, vbNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
	
	/*
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	*/


	/*
		Code for index buffers based upon Mozilla documentation at
			https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Creating_3D_objects_using_WebGL
	*/
//	/*
	ibIndexBuffer = gl.createBuffer();
	ibIndexBuffer.numItems = objRender.numIndices();	// 4 vectors in vertex buffer
	ibIndexBuffer.itemSize = 3;						// 3 elements in size each
	
	// Make index buffer (ibIndexBuffer) active
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibIndexBuffer);
	// Bind (Float32 converted) vertex array (objRender.vertexData) to active index buffer (ibIndexBuffer)
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(objRender.vertexIndices), gl.STATIC_DRAW);
//	*/

	/*
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	*/

	// create UNIFORM variable, and assign shader uniform (uLight) to it
	uLight = gl.getUniformLocation(shaderProgram, "uLight");
	uColor = gl.getUniformLocation(shaderProgram, "uColor");

	// create UNIFORM variable, and assign shader uniform (uProj, uMove, and uNorm) to it
	uProj = gl.getUniformLocation(shaderProgram, "uProj");
	uMove = gl.getUniformLocation(shaderProgram, "uMove");
	uNorm = gl.getUniformLocation(shaderProgram, "uNorm");
	uChange = gl.getUniformLocation(shaderProgram, "uChange");


	/*
		Textures based on code from:
			https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL
			http://learningwebgl.com/blog/?p=507
	*/

	texBuffer = gl.createTexture();
	imgBuffer = new Image();
	imgBuffer.onload = function(){
		gl.bindTexture(gl.TEXTURE_2D, texBuffer);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgBuffer);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null)
	}
	imgBuffer.src = "./textures/crate.jpg";

	vbUVBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vbUVBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objRender.uvData), gl.STATIC_DRAW);

	aTexUV = gl.getAttribLocation(shaderProgram, "aTexUV");
	gl.enableVertexAttribArray(aTexUV);
	gl.vertexAttribPointer(aTexUV, 2, gl.FLOAT, false, 0, 0);

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texBuffer);
	uSampler = gl.getUniformLocation(shaderProgram, "uSampler");

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
			sphere,				// callback
			0.0, 360.0, 5.0,		// U-Parameterization (Min, Max, Step)	(Longitude)
			0.0, 180.0, 5.0,		// V-Parameterization (Min, Max, Step)	(Degrees from South-Pole)
			1.0, "empty"			// function parameters (radius and dummy)
		);

	if(sFunction === "torus")
		obj.evaluate(
			torus,				// callback
			0.0, 360.0, 5.0,		// U-Parameterization (Min, Max, Step)	(Along the tube)
			0.0, 360.0, 5.0,		// V-Parameterization (Min, Max, Step)	(Degrees from South-Pole)
			1.0, 2.0			// function parameters (radius and dummy)
		 );
	
	if(sFunction === "square")
		obj.evaluate(
			square,				// callback
			0.0, 1.0, 0.1,			// U-Parameterization (Min, Max, Step)	(Along the horizontal of the square)
			0.0, 1.0, 0.1,			// V-Parameterization (Min, Max, Step)	(Along the vertical of the square)
			-0.5, 0.5			// function parameters (starting from and stopping at)
		);

	if(sFunction === "cube"){
/*
		obj.evaluate(
			cube,				// callback
			0.0, 4.0, 0.1,			// U-Parameterization (Min, Max, Step)	(Along the horizontal of the cube map)
			0.0, 3.0, 0.1,			// V-Parameterization (Min, Max, Step)	(Along the vertical of the cube map)
			1.0, -1.0/2.0			// function parameters (size and centerinf offset)
		);
*/
		//	Front face	
		obj.evaluate(
			square,				// callback
			0.0, 1.0, 0.1,			// U-Parameterization (Min, Max, Step)	(Along the horizontal of the square)
			0.0, 1.0, 0.1,			// V-Parameterization (Min, Max, Step)	(Along the vertical of the square)
			-1.0, 1.0			// function parameters (starting from and stopping at)
		);

		//	Left face
		var mat3t = [ 0.0, 0.0,-1.0,
			      0.0, 1.0, 0.0,
			      1.0, 0.0, 0.0];
		var newObj = obj.transform(mat3t);	// Apply transformation to original data
		var rtrnObj = newObj.merge(obj);	// Merge back into object being returned

		//	Right face
		mat3t = [ 0.0, 0.0, 1.0,
			  0.0, 1.0, 0.0,
			 -1.0, 0.0, 0.0];
		newObj = obj.transform(mat3t);		// Apply transformation to original data
		rtrnObj = newObj.merge(rtrnObj);		// Merge back into object being transformed

		//	Back face
		mat3t = [ 1.0, 0.0, 0.0,
			  0.0, 1.0, 0.0,
			  0.0, 0.0,-1.0];
		newObj = obj.transform(mat3t);		// Apply transformation to original data
		rtrnObj = newObj.merge(rtrnObj);	// Merge back into object being transformed

		//	Up face
		mat3t = [ 1.0, 0.0, 0.0,
			  0.0, 0.0, 1.0,
			  0.0,-1.0, 0.0];
		newObj = obj.transform(mat3t);		// Apply transformation to original data
		rtrnObj = newObj.merge(rtrnObj);	// Merge back into object being transformed

		//	Down face
		mat3t = [ 1.0, 0.0, 0.0,
			  0.0, 0.0,-1.0,
			  0.0, 1.0, 0.0];
		newObj = obj.transform(mat3t);		// Apply transformation to original data
		rtrnObj = newObj.merge(rtrnObj);	// Merge back into object being transformed

		obj = rtrnObj;				// Set 'obj' to actual merged object
	}
	



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
