var canvas;
var gl;


var vbVertexBuffer, vbNormalBuffer;

var objRender = new Geom();


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
