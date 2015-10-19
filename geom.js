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
	this.arrayForm[0] = this.y;
	this.arrayForm[0] = this.z;
	
}

function Surface3d(position, normal){
	this.position = position;
	this.normal = normal;
	
}

function Geom(){
	this.data_type = undefined;
	/*
	 WebGLRenderingContext.POINTS			= 0x0000;
	 WebGLRenderingContext.LINES			= 0x0001;
	 WebGLRenderingContext.LINE_LOOP		= 0x0002;
	 WebGLRenderingContext.LINE_STRIP		= 0x0003;
	 WebGLRenderingContext.TRIANGLES		= 0x0004;
	 WebGLRenderingContext.TRIANGLE_STRIP	= 0x0005;
	 WebGLRenderingContext.TRIANGLE_FAN		= 0x0006;
	 */
	this.vertex_data = [];		//	Assumes this.data_type = WebGLRenderingContext.TRIANGLES
	this.normal_data = [];		//	Assumes this.data_type = WebGLRenderingContext.TRIANGLES
	
	// The following code is not implemented
	// is only included to highlight differences of
	this.vertex_indices = [];	//	If 'this.vertex_data' needs indices, Then 'this.vertex_indices' provides it, Else 'this.vertex_indices' is meaningless
	this.normal_indices = [];	//	If 'this.normal_data' needs indices, Then 'this.normal_indices' provides it, Else 'this.normal_indices' is meaningless
	
	return this;
};


Geom.prototype.numVectors = function(){
	
	if(this.vertex_data.length % 3)
		return -1;			// does not contain 3-vectors;
	
	if(this.normal_data.length && this.normal_data.length != this.vertex_data.length)
		return -1;			// contains normal data but not same size as vertex data;

	return (this.vertex_data.length / 3);
	
}

Geom.prototype.numIndices = function(){
	
	if(this.vertex_indices.length % 3)
		return -1;			// does not contain 3-vectors;
	
	if(this.normal_indices.length && this.normal_indices.length != this.vertex_indices.length)
		return -1;			// contains normal data but not same size as vertex data;

	return (this.vertex_indices.length);
	
}

Geom.prototype.evaluate = function(
//	vertex_array, normal_array,			// arrays to store output
	fnCallback,							// callback
	uMin, uMax, uStep,					// u-Variable in UV parameterization
	vMin, vMax, vStep,					// v-Variable in UV parameterization
	fParamOne, fParamTwo				// Parameters to feed to the callback
){

	var vertex_array = [];
	var normal_array = [];

	var uSteps = Math.round( (uMax - uMin) / uStep) + 1;
	var vSteps = Math.round( (vMax - vMin) / vStep) + 1;

	var uvArray = new Array(uSteps * vSteps);
	var iStride = vSteps;	


	for(var uInc = uMin; uInc <= uMax; uInc += uStep, uInc = Math.round(uInc*1000)/1000)
		for(var vInc = vMin; vInc <= vMax; vInc += vStep, vInc = Math.round(vInc*1000)/1000){

			var result = fnCallback(uInc, vInc, fParamOne, fParamTwo);
			var uIndex = Math.round((uInc - uMin) / uStep);
			var vIndex = Math.round((vInc - vMin) / vStep);
		
			uvArray[uIndex * iStride + vIndex] = result;
			if(typeof result !== "undefined")
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
						vertex_array.push(uv00.position.x, uv00.position.y, uv00.position.z);
						vertex_array.push(uv10.position.x, uv10.position.y, uv10.position.z);
						vertex_array.push(uv01.position.x, uv01.position.y, uv01.position.z);

						// Triangle 2 vertices
						vertex_array.push(uv11.position.x, uv11.position.y, uv11.position.z);
						vertex_array.push(uv01.position.x, uv01.position.y, uv01.position.z);
						vertex_array.push(uv10.position.x, uv10.position.y, uv10.position.z);

						// Triangle 1 normals
						normal_array.push(uv00.normal.x, uv00.normal.y, uv00.normal.z);
						normal_array.push(uv10.normal.x, uv10.normal.y, uv10.normal.z);
						normal_array.push(uv01.normal.x, uv01.normal.y, uv01.normal.z);

						// Triangle 2 normals
						normal_array.push(uv11.normal.x, uv11.normal.y, uv11.normal.z);
						normal_array.push(uv01.normal.x, uv01.normal.y, uv01.normal.z);
						normal_array.push(uv10.normal.x, uv10.normal.y, uv10.normal.z);
					}

				}

/*
			if(typeof result !== "undefined"){
				vertex_array.push(result.position.x, result.position.y, result.position.z );
				normal_array.push(result.normal.x, result.normal.y, result.normal.z );				
			}
*/
			
		}
	
	this.data_type = WebGLRenderingContext.TRIANGLES;
	this.vertex_data = vertex_array;
	this.normal_data = normal_array;
	
}

Geom.prototype.transform = function(mat3Transform){

	if(mat3Transform.length != 9)
		return undefined;
	var mat4Transform = mat4FromMat3(mat4.create(), mat3Transform);
	var mat3Normal = mat3.normalFromMat4(mat3.create(), mat4Transform);


	var newGeom = new Geom();
	newGeom.data_type = this.data_type;
	newGeom.vertex_data = arrayMatrixMultiply(new Float32Array(this.vertex_data.length), mat3Transform, this.vertex_data);
	newGeom.normal_data = arrayMatrixMultiply(new Float32Array(this.normal_data.length), mat3Normal, this.normal_data);
	newGeom.vertex_indices = this.vertex_indices;
	newGeom.normal_indices = this.normal_indices;

	return newGeom;

//	return mat3Normal;
}

Geom.prototype.merge = function(geomToAdd){

	if(this.data_type != geomToAdd.data_type)
		return undefined;
	
	var rtrnGeom = new Geom();

	rtrnGeom = this;

	var arrVertexVector = new Float32Array(this.vertex_data.length + geomToAdd.vertex_data.length);
	var arrNormalVector = new Float32Array(this.normal_data.length + geomToAdd.normal_data.length);

	var arrVertexIndex = new Int32Array(this.vertex_indices.length + geomToAdd.vertex_indices.length);
	var arrNormalIndex = new Int32Array(this.normal_indices.length + geomToAdd.normal_indices.length);

	//	Assign 'this' arrays
	for(var iInc = 0; iInc < this.vertex_data.length; iInc++){
		arrVertexVector[iInc] = this.vertex_data[iInc];
		arrNormalVector[iInc] = this.normal_data[iInc];
	}
	for(var iInc = 0; iInc < this.vertex_indices.length; iInc++){
		arrVertexIndex[iInc] = this.vertex_indices[iInc];
		arrNormalIndex[iInc] = this.normal_indices[iInc];
	}
	
	
	var iStartVector = this.numVectors();

	var iStartVectorElement = this.vertex_data.length;
	var iStartIndexElement = this.vertex_indices.length;

	//	Assign 'geomToAdd' arrays'
	for(var iInc = 0; iInc < geomToAdd.vertex_data.length; iInc++){
		arrVertexVector[iStartVectorElement + iInc] = geomToAdd.vertex_data[iInc];
		arrNormalVector[iStartVectorElement + iInc] = geomToAdd.normal_data[iInc];
	}
	for(var iInc = 0; iInc < geomToAdd.vertex_indices.length; iInc++){
		arrVertexIndex[iStartIndexElement + iInc] = geomToAdd.vertex_index[iInc] + iStartVector;
		arrNormalIndex[iStartIndexElement + iInc] = geomToAdd.normal_index[iInc] + iStartVector;
		//	Offset indices of 'newGeomToAdd' by number of vectors in 'this'
	}

	rtrnGeom.vertex_data = arrVertexVector;
	rtrnGeom.normal_data = arrNormalVector;
	rtrnGeom.vertex_indices = arrVertexIndex;
	rtrnGeom.normal_indices = arrNormalIndex;

	return rtrnGeom;
	

}
