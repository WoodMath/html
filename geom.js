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

Geom.prototype.evaluate = function(
//	vertex_array, normal_array,			// arrays to store output
	fnCallback,							// callback
	uMin, uMax, uStep,					// u-Variable in UV parameterization
	vMin, vMax, vStep,					// v-Variable in UV parameterization
	fParamOne, fParamTwo				// Parameters to feed to the callback
){

	var vertex_array = [];
	var normal_array = [];
	
	for(uInc = uMin; uInc <= uMax; uInc += uStep)
		for(vInc = vMin; vInc <= vMax; vInc += vStep){
			var result = fnCallback(uInc, vInc, fParamOne, fParamTwo);
			if(typeof result !== "undefined"){
				vertex_array.push(result.position.x, result.position.y, result.position.z );
				normal_array.push(result.normal.x, result.normal.y, result.normal.z );
				
			}
			
		}
	
	this.data_type = WebGLRenderingContext.TRIANGLES;
	this.vertex_data = vertex_array;
	this.normal_data = normal_array;
	
}