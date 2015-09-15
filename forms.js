
var fr = new FileReader();
/*
document.getElementById('fileVertexList').addEventListener('change', buttonRead, false);
*/

/*
	http://blog.teamtreehouse.com/reading-files-using-the-html5-filereader-api
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators
	http://www.htmlgoodies.com/beyond/javascript/read-text-files-using-the-javascript-filereader.html#fbid=JPxxNs8cA6s
	http://www.html5rocks.com/en/tutorials/file/dndfiles/
	http://stackoverflow.com/questions/13729301/html5-file-api-how-to-see-the-result-of-readastext
 
 
*/

function buttonRead(evt){
	
	var file = evt.target.files[0];
	console.log(" file.name = " + file.name);

	
	var contents = undefined;
	fr.onload = function(e){
		
		contents = e.target.result;
/*
		console.log(contents);
*/
	};
	fr.readAsText(file);
	return contents;
}