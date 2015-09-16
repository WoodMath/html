
var fr = new FileReader();




/*
document.getElementById('fileVertexList').addEventListener('change',
	function(evt){
		console.log(" evt.target.files[0].name = " + evt.target.files[0].name)
	}, false);
*/
/*
	http://blog.teamtreehouse.com/reading-files-using-the-html5-filereader-api
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators
	http://www.htmlgoodies.com/beyond/javascript/read-text-files-using-the-javascript-filereader.html#fbid=JPxxNs8cA6s
	http://www.html5rocks.com/en/tutorials/file/dndfiles/
	http://stackoverflow.com/questions/13729301/html5-file-api-how-to-see-the-result-of-readastext
	http://blog.teamtreehouse.com/reading-files-using-the-html5-filereader-api
 
 
*/

function buttonRead(evt,validFunc,strVar){
	
	var file = evt.target.files[0];
//	console.log(" file.name = " + file.name);

	var contents;
	
	fr.onload = function(e){

		contents = e.target.result;
		contents = validFunc(contents);
		var marks = (validFunc == testShaderFile) ? "\"" : "";
		if(contents)
			eval(strVar + " = " + marks + contents + marks + " ; ");

	}
	
	fr.readAsText(file);

}


function testVectorFile(strText){

	strText = strText.replace(/\n/g,"");

	strText = strText.replace(new RegExp(/ *, */g),",");
	strText = strText.replace(new RegExp(/ *\[ */g),"[");
	strText = strText.replace(new RegExp(/ *\] */g),"]");
	strText = strText.replace(new RegExp(/\[\./g),"[0.");
	strText = strText.replace(new RegExp(/\.\]/g),".0]");
	strText = strText.replace(new RegExp(/,\./g),",0.");
	strText = strText.replace(new RegExp(/\.,/g),".0,");

	var pass = true;
	if(strText.search(new RegExp(/([a-z]|[A-Z])/gi)) > -1)
		return false;
	
											
	var arr = eval(strText);
	if(arr.length % 3 != 0){
			alert(" Vector file contains " + arr.length + " floats. Must be a multiple of 3 to make vertices");
			return false;
	}
											
	return strText;
	
	
											 
}

function testShaderFile(strText){
											
	strText = strText.replace(/\/\*[;., _=\n\r\f\t\w\^\$\*\+\?\.\(\)\|\{\}\[\]]*\*\//g,"");
	strText = strText.replace(/\/\/[;., _=\t\w\^\$\*\+\?\.\(\)\|\{\}\[\]]*[\n\r\f]/g,"");
	strText = strText.replace(/[\n\r\f]/g,"");

//	strText = strText.replace(/ ( *)/g," ");
	strText = strText.replace(/ +/g," ");
									 
											
	if(strText.search(new RegExp(/(gl_Position|gl_FragColor)/)) == -1)
			return false;	// no return types for vertex shader (gl_Position) and fragment shader (gl_FragColor)
	if(strText.search(new RegExp(/main\(\)/)) == -1)
			return false;	// no entry (void main()) found
	
	return strText;
	
}