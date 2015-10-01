var canvas;
var gl;


var vbVertexBuffer, vbNormalBuffer;

var objRender = new Geom();




function WebCamStart(){
	
	

	
	initGL();
	initShaders();
	initBuffers();
	
	draw();
	
	
}
