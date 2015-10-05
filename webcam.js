var canvas;
var gl;


var vbVertexBuffer, vbNormalBuffer;

var objRender = new Geom();

function testSetup(){
/*
	Code in 'testSetup()' function is based in part from tutorial at
		http://www.html5rocks.com/en/tutorials/getusermedia/intro/

*/
	function hasGetUserMedia() {
		return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia || navigator.msGetUserMedia);
	}

	if (hasGetUserMedia()) {
		// Good to go!
	} else {
		alert('getUserMedia() is not supported in your browser');
	}

}

function actualSetup(){
	webcam_canvas_video_left = document.getElementById("webcam_canvas_video_left");
	canvas = document.getElementById("webcam_canvas");		// this lets us know WHERE we are rendering
	gl = canvas.getContext("experimental-webgl");			// this lets us know WHAT we are rendering (WebGL as o

}

function WebCamStart(){
	
	

	
	testSetup();
	actualSetup();	

	draw();
	
	
}
