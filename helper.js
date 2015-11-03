"use strict";	//	Force variable declaration
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
	
	if(typeof arrDest !== "Float32Array" || arrDest.length != arrSource.length)
		arrDest = new Float32Array(arrSource.length);

	for(var iInc = 0; iInc < arrSource.length; iInc)
		arrDest[iInc] = -1.0 * arrSource[iInc];
	
	return arrDest;
	
}

function arrayMatrixMultiply(arrDest, arrMatrix, arrVectorList){

	if(typeof arrDest === "undefined")
		arrDest = new Float32Array(arrVectorList.length);

	if(typeof arrDest !== "Float32Array" || arrDest.length != arrVectorList.length)
		arrDest = new Float32Array(arrVectorList.length);

	if(arrVectorList.length % 3)
		return undefined;

	for(var iInc = 0; iInc < arrVectorList.length; iInc += 3){
		arrDest[iInc+0] = arrMatrix[0]*arrVectorList[iInc+0] + arrMatrix[1]*arrVectorList[iInc+1] + arrMatrix[2]*arrVectorList[iInc+2];
		arrDest[iInc+1] = arrMatrix[3]*arrVectorList[iInc+0] + arrMatrix[4]*arrVectorList[iInc+1] + arrMatrix[5]*arrVectorList[iInc+2];
		arrDest[iInc+2] = arrMatrix[6]*arrVectorList[iInc+0] + arrMatrix[7]*arrVectorList[iInc+1] + arrMatrix[8]*arrVectorList[iInc+2];

	}

	return arrDest;
}

function getTriangleNormal(v0, v1, v2){

	var vectorOne = new Vector3d(v1.x - v0.x, v1.y - v0.y, v1.z - v0.z);
	var vectorTwo = new Vector3d(v2.x - v0.x, v2.y - v0.y, v2.z - v0.z); 

	var vectorReturn = new Vector3d(
		1*(vectorOne.y * vectorTwo.z - vectorOne.z * vectorTwo.y),
		-1*(vectorOne.x * vectorTwo.z - vectorOne.z * vectorTwo.x),
		1*(vectorOne.x * vectorTwo.y - vectorOne.y * vectorTwo.x)

	);

}
