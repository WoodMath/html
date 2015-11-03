"use strict";	//	Force variable declaration
/*
	Defined according to post at
		http://stackoverflow.com/questions/1635116/javascript-class-method-vs-class-prototype-method
		http://stackoverflow.com/questions/4691044/should-i-use-prototype-or-not
		http://stackoverflow.com/questions/4012998/what-it-the-significance-of-the-javascript-constructor-property
*/

var WOODMATH = {version: '1', dateModified: '2015/09/17'};

function Vector3d(x,y,z){
	this.x = x;
	this.y = y;
	this.z = z;
	this.arrayForm = new Float32Array(3);
	this.arrayForm[0] = this.x;
	this.arrayForm[1] = this.y;
	this.arrayForm[2] = this.z;
	return this;
	
};

Vector3d.prototype.magnitude = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};

Vector3d.prototype.normalize = function(){
	var fTemp = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	return new Vector3d(this.x / fTemp, this.y / fTemp, this.z / fTemp);
};

Vector3d.prototype.updateArrayForm = function(){
	this.arrayForm[0] = this.x;
	this.arrayForm[1] = this.y;
	this.arrayForm[2] = this.z;
	return this;	
}

function Vector2d(u,v){
	this.u = u;
	this.v = v;
	this.arrayForm = new Int32Array(2);
	this.arrayForm[0] = this.u;
	this.arrayForm[1] = this.v;
}

Vector2d.prototype.updateArrayForm = function(){
	this.arrayForm[0] = this.u;
	this.arrayForm[1] = this.v;
	return this;
}

function Surface3d(position, normal, uv){
	this.position = position;
	this.normal = normal;
	this.uv = uv;
}

function Geom(){
	this.dataType = undefined;
	/*
	 WebGLRenderingContext.POINTS			= 0x0000;
	 WebGLRenderingContext.LINES			= 0x0001;
	 WebGLRenderingContext.LINE_LOOP		= 0x0002;
	 WebGLRenderingContext.LINE_STRIP		= 0x0003;
	 WebGLRenderingContext.TRIANGLES		= 0x0004;
	 WebGLRenderingContext.TRIANGLE_STRIP		= 0x0005;
	 WebGLRenderingContext.TRIANGLE_FAN		= 0x0006;
	 */
	this.vertexData = [];		//	Assumes this.dataType = WebGLRenderingContext.TRIANGLES
	this.normalData = [];		//	Assumes this.dataType = WebGLRenderingContext.TRIANGLES
	this.uvData = [];
	
	// The following code is not implemented
	// is only included to highlight differences of
	this.vertexIndices = [];	//	If 'this.vertexData' needs indices, Then 'this.vertexIndices' provides it, Else 'this.vertexIndices' is meaningless
	this.normalIndices = [];	//	If 'this.normalData' needs indices, Then 'this.normalIndices' provides it, Else 'this.normalIndices' is meaningless
	this.uvIndices = [];

	return this;
};


Geom.prototype.numVectors = function(){
	
	if(this.vertexData.length % 3)
		return -1;			// does not contain 3-vectors;
	
	if(this.normalData.length && this.normalData.length != this.vertexData.length)
		return -1;			// contains normal data but not same size as vertex data;

	return (this.vertexData.length / 3);
	
}

Geom.prototype.numIndices = function(){
	
	if(this.vertexIndices.length % 3)
		return -1;			// does not contain 3-vectors;
	
	if(this.normalIndices.length && this.normalIndices.length != this.vertexIndices.length)
		return -1;			// contains normal data but not same size as vertex data;

	return (this.vertexIndices.length);
	
}

Geom.prototype.evaluate = function(
//	vertexArray, normalArray,			// arrays to store output
	fnCallback,					// callback
	uMin, uMax, uStep,				// u-Variable in UV parameterization
	vMin, vMax, vStep,				// v-Variable in UV parameterization
	jParams						// Parameters (in JSON format) to feed to the callback
){

	var vertexArray = [];
	var normalArray = [];
	var uvArray = [];

	var uSteps = Math.round( (uMax - uMin) / uStep) + 1;
	var vSteps = Math.round( (vMax - vMin) / vStep) + 1;

	var uvArray = new Array(uSteps * vSteps);
	var iStride = vSteps;	


	for(var uInc = uMin; uInc <= uMax; uInc += uStep, uInc = Math.round(uInc*1000)/1000)
		for(var vInc = vMin; vInc <= vMax; vInc += vStep, vInc = Math.round(vInc*1000)/1000){

			var result = fnCallback(uInc, vInc, jParam);
			var uIndex = Math.round((uInc - uMin) / uStep);
			var vIndex = Math.round((vInc - vMin) / vStep);
		
			if(typeof result !== "undefined")
				

				uvArray[uIndex * iStride + vIndex] = result;
				if(uIndex > 0 && vIndex > 0){ // is not on lower end of UV boundary
					var uv00 = uvArray[(uIndex-1)*iStride + (vIndex-1)];		// 	LL corner
					var uv01 = uvArray[(uIndex-1)*iStride + (vIndex-0)];		// 	UL corner
					var uv10 = uvArray[(uIndex-0)*iStride + (vIndex-1)];		//	LR corner
					var uv11 = uvArray[(uIndex-0)*iStride + (vIndex-0)];		//	UR corner

					if(typeof uv00 !== "undefined" && 
						typeof uv01 !== "undefined" && 
							typeof uv10 !== "undefined" && 
								typeof uv11 !== "undefined"){


//						console.log(" uvInc = [" + uInc + "," + vInc + "], uvIndex = [" + uIndex + "," + vIndex + "] \n");
						// Triangle 1 vertices
						vertexArray.push(uv00.position.x, uv00.position.y, uv00.position.z);
						vertexArray.push(uv10.position.x, uv10.position.y, uv10.position.z);
						vertexArray.push(uv01.position.x, uv01.position.y, uv01.position.z);

						// Triangle 2 vertices
						vertexArray.push(uv11.position.x, uv11.position.y, uv11.position.z);
						vertexArray.push(uv01.position.x, uv01.position.y, uv01.position.z);
						vertexArray.push(uv10.position.x, uv10.position.y, uv10.position.z);

						// Triangle 1 normals
						normalArray.push(uv00.normal.x, uv00.normal.y, uv00.normal.z);
						normalArray.push(uv10.normal.x, uv10.normal.y, uv10.normal.z);
						normalArray.push(uv01.normal.x, uv01.normal.y, uv01.normal.z);

						// Triangle 2 normals
						normalArray.push(uv11.normal.x, uv11.normal.y, uv11.normal.z);
						normalArray.push(uv01.normal.x, uv01.normal.y, uv01.normal.z);
						normalArray.push(uv10.normal.x, uv10.normal.y, uv10.normal.z);

						// Triangle 1 UVs
						uvArray.push(uv00.uv.u, uv00.uv.v);
						uvArray.push(uv10.uv.u, uv10.uv.v);
						uvArray.push(uv01.uv.u, uv01.uv.v);

						// Triangle 2 UVs
						uvArray.push(uv11.uv.x, uv11.uv.v);
						uvArray.push(uv01.uv.x, uv01.uv.v);
						uvArray.push(uv10.uv.x, uv10.uv.v);
				
					}

				}

/*
			if(typeof result !== "undefined"){
				vertexArray.push(result.position.x, result.position.y, result.position.z );
				normalArray.push(result.normal.x, result.normal.y, result.normal.z );				
			}
*/
			
		}
	
	this.dataType = WebGLRenderingContext.TRIANGLES;
	this.vertexData = vertexArray;
	this.normalData = normalArray;
	this.uvData = uvArray;	
}

Geom.prototype.transform = function(mat3Transform){

	if(mat3Transform.length != 9)
		return undefined;
	var mat4Transform = mat4FromMat3(mat4.create(), mat3Transform);
	var mat3Normal = mat3.normalFromMat4(mat3.create(), mat4Transform);


	var newGeom = new Geom();
	newGeom.dataType = this.dataType;
	newGeom.vertexData = arrayMatrixMultiply(new Float32Array(this.vertexData.length), mat3Transform, this.vertexData);
	newGeom.normalData = arrayMatrixMultiply(new Float32Array(this.normalData.length), mat3Normal, this.normalData);
	newGeom.uvData = this.uvData;
	newGeom.vertexIndices = this.vertexIndices;
	newGeom.normalIndices = this.normalIndices;
	newGeom.uvIndices = this.uvIndices;

	return newGeom;

//	return mat3Normal;
}

Geom.prototype.merge = function(geomToAdd){

	if(this.dataType != geomToAdd.dataType)
		return undefined;
	
	var rtrnGeom = new Geom();

	rtrnGeom = this;

	var arrVertexVector = new Float32Array(this.vertexData.length + geomToAdd.vertexData.length);
	var arrNormalVector = new Float32Array(this.normalData.length + geomToAdd.normalData.length);
	var arrUVVector = new Float32Array(this.uvData.length + geomToAdd.uvData.length);

	var arrVertexIndex = new Int32Array(this.vertexIndices.length + geomToAdd.vertexIndices.length);
	var arrNormalIndex = new Int32Array(this.normalIndices.length + geomToAdd.normalIndices.length);
	var arrUVIndex = new Int32Array(this.uvIndices.length + geomToAdd.uvIndices.length);

	//	Assign 'this' arrays
	for(var iInc = 0; iInc < this.vertexData.length; iInc++){
		arrVertexVector[iInc] = this.vertexData[iInc];
		arrNormalVector[iInc] = this.normalData[iInc];
	}
	for(var iInc = 0; iInc < this.uvData.length; iInc++)
		arrUVVector[iInc] = this.uvData[iInc];
	for(var iInc = 0; iInc < this.vertexIndices.length; iInc++){
		arrVertexIndex[iInc] = this.vertexIndices[iInc];
		arrNormalIndex[iInc] = this.normalIndices[iInc];
		arrUVIndex[iInc] = this.uvIndices[iInc];
	}
	
	
	var iStartVector = this.numVectors();
	var iStartVectorElement = this.vertexData.length;
	var iStartUVVectorElement = this.uvData.length / 2;
	var iStartIndexElement = this.vertexIndices.length;

	//	Assign 'geomToAdd' arrays'
	for(var iInc = 0; iInc < geomToAdd.vertexData.length; iInc++){
		arrVertexVector[iStartVectorElement + iInc] = geomToAdd.vertexData[iInc];
		arrNormalVector[iStartVectorElement + iInc] = geomToAdd.normalData[iInc];
	}
	for(var iInc = 0; iInc < geomToAdd.uvData.length; iInc++)
		arrUVVector[iStartUVVectorElement + iInc] = geomToAdd.uvData[iInc];
	for(var iInc = 0; iInc < geomToAdd.vertexIndices.length; iInc++){
		arrVertexIndex[iStartIndexElement + iInc] = geomToAdd.vertexIndices[iInc] + iStartVector;
		arrNormalIndex[iStartIndexElement + iInc] = geomToAdd.normalIndices[iInc] + iStartVector;
		arrUVIndex[iStartIndexElement + iInc] = geomToAdd.uvIndices[iInc] + iStartVector;
		//	Offset indices of 'newGeomToAdd' by number of vectors in 'this'
	}

	rtrnGeom.vertexData = arrVertexVector;
	rtrnGeom.normalData = arrNormalVector;
	rtrnGeom.uvData = arrUVVector;
	rtrnGeom.vertexIndices = arrVertexIndex;
	rtrnGeom.normalIndices = arrNormalIndex;
	rtrnGeom.uvIndices = arrUVIndex;

	return rtrnGeom;
	

}
