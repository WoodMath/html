/*
	Defined according to post at
		http://stackoverflow.com/questions/1635116/javascript-class-method-vs-class-prototype-method
*/

var WOODMATH = {version: '1', dateModified: '2015/09/17'};

function Geom(){};

Geom.prototype.data_type;
/*
	POINTS				= 0x0000;
	LINES				= 0x0001;
	LINE_LOOP			= 0x0002;
	LINE_STRIP			= 0x0003;
	TRIANGLES			= 0x0004;
	TRIANGLE_STRIP		= 0x0005;
	TRIANGLE_FAN		= 0x0006;
*/
Geom.prototype.vertex_data;
Geom.prototype.normal_data;
Geom.prototype.numVectors = function(){
	
	
	if(this.vertex_data.length % 3)
		return -1;			// does not contain 3-vectors;
	
	if(this.normal_data.length && this.normal_data.length != this.vertex_data.length)
		return -1;			// contains normal data but not same size as vertex data;

	return (this.vertex_data.length / 3);
	
}