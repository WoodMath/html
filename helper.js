function mat4FromMat3(matDest, matSource){
	
	if(typeof matDest === "undefined")
		matDest = mat4.create();
/*
	Code above based upon following discussions:
		http://stackoverflow.com/questions/899574/which-is-best-to-use-typeof-or-instanceof
		http://stackoverflow.com/questions/27509/detecting-an-undefined-object-property
		http://stackoverflow.com/questions/523643/difference-between-and-in-javascript
		http://stackoverflow.com/questions/359494/does-it-matter-which-equals-operator-vs-i-use-in-javascript-comparisons
*/
	
	matDest[ 0] = matSource[ 0];
	matDest[ 1] = matSource[ 1];
	matDest[ 2] = matSource[ 2];
	matDest[ 3] = 0.0;
	matDest[ 4] = matSource[ 3];
	matDest[ 5] = matSource[ 4];
	matDest[ 6] = matSource[ 5];
	matDest[ 7] = 0.0;
	matDest[ 8] = matSource[ 6];
	matDest[ 9] = matSource[ 7];
	matDest[10] = matSource[ 8];
	matDest[11] = 0.0;
	matDest[12] = 0.0;
	matDest[13] = 0.0;
	matDest[14] = 0.0;
	matDest[15] = 1.0;
	
	return matDest;
	
}

function arrayNegate(arrDest, arrSource){
	
	if(typeof arrDest === "undefined")
		arrDest = new Float32Array(arrSource.length);
	
	if(typeof arrDest != "Float32Array")
		delete arrDest,
		arrDest = new Float32Array(arrSource.length);
	
	if(arrDest.length != arrSource.length)
		delete arrDest,
		arrDest = new Float32Array(arrSource.length);
	
	for(var iInc = 0; iInc < arrSource.length; iInc)
		arrDest[iInc] = -1.0 * arrSource[iInc];
	
	return arrDest;
	
}
