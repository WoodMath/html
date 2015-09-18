
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



function buttonRead(evt,validFunc,strVar,strSub){
	
	var file = evt.target.files[0];
//	console.log(" file.name = " + file.name);

	var contents;
	
	fr.onload = function(e){

		contents = e.target.result;
		contents = validFunc(contents,strVar,strSub);

	};
	
	
	fr.readAsText(file);

};

function parseType(strText, strVar){

	var typExp = new RegExp(/(POINTS)|(LINES)|(LINE_LOOP)|(LINE_STRIP)|(TRIANGLES)|(TRIANGLE_STRIP)|(TRIANGLE_FAN)/ig);

	var result = strText.match(typExp);
	
	if(result.length > 0)
		eval(strVar.trim() + ".data_type" + " = " + result[0] + " ; ");
};

function parseData(strText, strVar, strSub){
	
	strText = strText.replace(new RegExp(/ *, */g),",");
	strText = strText.replace(new RegExp(/ *\[ */g),"[");
	strText = strText.replace(new RegExp(/ *\] */g),"]");
	strText = strText.replace(new RegExp(/\[\./g),"[0.");
	strText = strText.replace(new RegExp(/\.\]/g),".0]");
	strText = strText.replace(new RegExp(/,\./g),",0.");
	strText = strText.replace(new RegExp(/\.,/g),".0,");
											
	eval(strVar + " = " + strText);
	
	var arr = eval(strText);
	if(arr.length % 3 != 0){
		alert(" Vector file contains " + arr.length + " floats. Must be a multiple of 3 to make vertices");
		return false;
	}

	eval(strVar.trim() + "." + strSub.trim() + " = " + "WebGLRenderingContext." + strText.trim());

}

function testVectorFile(strText,strVar,strSub){

	strText = strText.replace(/\/\*[;., _=\n\r\f\t\w\^\$\*\+\?\.\(\)\|\{\}\[\]]*\*\//g,"");
	strText = strText.replace(/\/\/[;., _=\t\w\^\$\*\+\?\.\(\)\|\{\}\[\]]*[\n\r\f]/g,"");
	strText = strText.replace(/[\n\r\f]/g,"");
							  
							  
	
	strText = strText.replace(/( )/);
							  
	var strSemiPos = strText.search(";");
	
	var strOne, strTwo;
	
	var typExp = new RegExp(/(POINTS)|(LINES)|(LINE_LOOP)|(LINE_STRIP)|(TRIANGLES)|(TRIANGLE_STRIP)|(TRIANGLE_FAN)/ig);
							  
	if(strSemiPos > -1){
		strOne = strText.substring(0, strSemiPos - 1);
		strTwo = strText.substring(strSemiPos + 1);

		// know there will be at lease one string before ';'
		if(strOne.search(typExp) > -1)
			parseType(strOne,strVar);
		else if(strOne.search(/[a-z]/gi) == -1 && strOne.search(/[0-9]/ig) > -1)
			parseData(strOne,strVar,strSub);
							  
		if(strTwo.length > 0){
			if(strTwo.search(typExp) > -1)
				parseType(strTwo,strVar);
			else if(strTwo.search(/[a-z]/gi) == -1 && strTwo.search(/[0-9]/ig) > -1)
				parseData(strTwo,strVar,strSub);
		}else if(strOne.search(/[a-z]/gi) == -1 && strOne.search(/[0-9]/ig) > -1)
			eval(strVar.trim() + ".data_type" + " = WebGLRenderingContext.TRIANGLE_STRIP  ; ");			// assign triangle strip as default

							  
	}else{

		strOne = strText;
		if(strOne.search(/[a-z]/i) == -1 && strOne.search(/[0-9]/ig) > -1)
			parseData(strOne,strVar,strSub);
	}

											
	return strText;
	
	
											 
}

function testShaderFile(strText,strVar){
											
	strText = strText.replace(/\/\*[;., _=\n\r\f\t\w\^\$\*\+\?\.\(\)\|\{\}\[\]]*\*\//g,"");
	strText = strText.replace(/\/\/[;., _=\t\w\^\$\*\+\?\.\(\)\|\{\}\[\]]*[\n\r\f]/g,"");
	strText = strText.replace(/[\n\r\f]/g,"");

//	strText = strText.replace(/ ( *)/g," ");
	strText = strText.replace(/ +/g," ");
									 
											
	if(strText.search(new RegExp(/(gl_Position|gl_FragColor)/)) == -1)
			return false;	// no return types for vertex shader (gl_Position) and fragment shader (gl_FragColor)
	if(strText.search(new RegExp(/main\(\)/)) == -1)
			return false;	// no entry (void main()) found
							  
	eval(strVar + " = " + "\"" + strText + "\"" + " ; ");
	
	return strText;
	
}