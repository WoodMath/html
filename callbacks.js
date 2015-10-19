"use strict";	//	Force variable declaration
function sphere(			//  creates a sphere centered at origin, by rotating circle around Y-axis
	uParam,
	vParam,
	fRadius,				//	radius of circle sphere
	fDummy					//	parameter not actually being used in calculation
){
	
/*
	 Formula for Sphere defined by Jeff Wood to keep him on his toes with his Math
	 
	 If sphere does not render properly consider using UV-parameterization located at
		https://en.wikipedia.org/wiki/Sphere#Equations_in_three-dimensional_space
*/
	if(uParam < 0.0 || 360.0 < uParam)
		return undefined;
	if(vParam < 0.0 || 180.0 < vParam)
		return undefined;
	
	var f3Position = new Vector3d(0.0, 0.0, 0.0);
	
	//	V-parameter will begin at South-pole, and wrap to North-pole
	var fRadiusToBeRotated = fRadius * Math.cos((vParam - 90.0)  * Math.PI / 180.0);
	f3Position.y = fRadius * Math.sin((vParam - 90.0) * Math.PI / 180.0);
	
	//	U-parameter will wrap around equator of Torus
	f3Position.x = fRadiusToBeRotated * Math.cos(uParam * Math.PI / 180.0);
	f3Position.z = fRadiusToBeRotated * Math.sin(uParam * Math.PI / 180.0);
	
	var f3Normal = new Vector3d(f3Position.x, f3Position.y, f3Position.z);
	f3Normal = f3Normal.normalize();
	// Beautiful thing about a sphere is the normal vector (non-normalized) is equal to the position vector

	var f3uv = new Vector2d(uParam, vParam);	
	var f3Surface = new Surface3d(f3Position,f3Normal,f3uv);
	
	return f3Surface;
	
	
}

function torus(				//  creates a torus lying on the XZ-plane
	uParam,
	vParam,
	fRadiusMinor,			//	radius of circle lying on XY-plane offset from the origin by X=fRadiusMajor
	fRadiusMajor			//	radius of circle lying on XZ-plane
){
	
/*
	Formula for Torus defined by Jeff Wood to keep him on his toes with his Math
 
	If torus does not render properly consider using UV-parameterization located at
		https://en.wikipedia.org/wiki/Torus#Geometry
*/
	if(uParam < 0.0 || 360.0 < uParam)
		return undefined;
	if(vParam < 0.0 || 360.0 < vParam)
		return undefined;
	
	var f3Position  = new Vector3d(0.0, 0.0, 0.0);
	var f3Normal = new Vector3d(0.0, 0.0, 0.0);
	
	//	V-parameter will begin in inner radius, wrap to outer radius, and return back to inner radius
	var fPositionRadiusToBeRotated = fRadiusMinor * Math.cos((vParam - 180) * Math.PI / 180.0) + fRadiusMajor;
	f3Position.y = fRadiusMinor * Math.sin((vParam - 180) * Math.PI / 180.0);

	//	U-parameter will wrap around circumfrence of Torus
	f3Position.x = fPositionRadiusToBeRotated * Math.cos(uParam * Math.PI / 180.0);
	f3Position.z = fPositionRadiusToBeRotated * Math.sin(uParam * Math.PI / 180.0);

	
	//	V-parameter will begin in inner radius, wrap to outer radius, and return back to inner radius
	var fNormalRadiusToBeRotated = 1.0 * Math.cos((vParam - 180) * Math.PI / 180.0) + 0.0;
	f3Normal.y = 1.0 * Math.sin((vParam - 180) * Math.PI / 180.0);
	
	//	U-parameter will wrap around circumfrence of Torus
	f3Normal.x = fNormalRadiusToBeRotated * Math.cos(uParam * Math.PI / 180.0);
	f3Normal.z = fNormalRadiusToBeRotated * Math.sin(uParam * Math.PI / 180.0);

	f3Normal = f3Normal.normalize();
	var f3uv = new Vector2d(uParam, vParam);	
	var f3Surface = new Surface3d(f3Position,f3Normal,f3uv);
	
	return f3Surface;


}

function square(		//  creates a square parrallel to the XY-plane (Perform rotatios on 6 calls to create cube)
   uParam,
   vParam,
   fPlaneMin,			//	minimum X,Y points to render
   fPlaneMax			//	maximum X,Y points to render, also used in Calculation of size and translation
){
	
/*
	 Formula for a square Parrallel to XY-plane, positioned based on fPlaneMin and fPlaneMax
*/

	if(uParam < 0.0 || 1.0 < uParam)
		return undefined;
	if(vParam < 0.0 || 1.0 < vParam)
		return undefined;
	
	var f3Position  = new Vector3d(0.0, 0.0, 0.0);
	var f3Normal = new Vector3d(0.0, 0.0, 1.0);
	
	var fDistance = fPlaneMax - fPlaneMin;
	f3Position.x = fPlaneMin + fDistance * uParam;
	f3Position.y = fPlaneMin + fDistance * vParam;
	f3Position.z = fPlaneMax

	var f3uv = new Vector2d(uParam, vParam);	
	var f3Surface = new Surface3d(f3Position,f3Normal,f3uv);
	
	return f3Surface;
}

function cube(		//  creates a box based on UV-parameterization of cube
	uParam,
	vParam,
	fSize,		//	cube size
	fOffset		//	determines whether cube is "centered" at origin (fOffset = -fSize/2) or "offset" from origin (fOffset = 0)
){

/*
			***** WARNING *****	

	The way this is currently set up does not distinguish between faces when using
		- uParam that are multiples of (1.0/uMaxSwitch) 
		- vParam that are multiples of (1.0/vMaxSwitch)
	This should not cause issues with Position Vectors, but depending on how Normal Vectors are calculated, may cause weird artifacts in the fragment shader depending on the face routine in which a normal is calculated.
 
	Consider implementing so that Normal Vectors for ambigous UV-values are interpolated between Normal-Vectors for adjoining faces (Currently proceeding along this path).
			- or -
	Consider implementing so that a valid UV interval is [0.0, 1.0)
*/
	
	
	
/*
	See representation at
		https://en.wikipedia.org/wiki/Cube_mapping
	based on UV-mapping of Unit Square
 
*/

	uParam = Math.round(uParam*1000)/1000;
	vParam = Math.round(vParam*1000)/1000;


	var uMaxSwitch = 1.0;		// use uMaxSwitch = 1.0, vMaxSwitch = 1.0 for map when over u = [0,4], v = [0,3] 
	var vMaxSwitch = 1.0;		// use uMaxSwitch = 4.0, vMaxSwitch = 3.0 for map when over u = [0,1], v = [0,1]
///*

	if(uParam < 0.0/uMaxSwitch || 4.0/uMaxSwitch < uParam)
		return undefined;
	if(vParam < 0.0/vMaxSwitch || 3.0/vMaxSwitch < vParam)
		return undefined;

	//	Test that either (1/4) <= U <= (2/4) or that (1/3) <= V <= (2/3)
	var bInvalidU;
	var bInvalidV;
	
	if( 1.0/uMaxSwitch < uParam && uParam  < 2.0/uMaxSwitch )
		bInvalidU = false;
	else
		bInvalidU = true;
	
	if( 1.0/vMaxSwitch < vParam && vParam  < 2.0/uMaxSwitch )
		bInvalidV = false;
	else
		bInvalidV = true;
	
	if(Boolean(bInvalidU) && Boolean(bInvalidV))
		return undefined;

	
	var f3Position  = new Vector3d(0.0, 0.0, 0.0);
	var f3Normal = new Vector3d(0.0, 0.0, 0.0);

//	if(!(0 < uParam && uParam < 1) || !(1 < vParam && vParam < 2))
//		return undefined;

	
	if((2.0/vMaxSwitch) < vParam && vParam < (3.0/vMaxSwitch)){		// UV is on Up face
		f3Position.x = (1.0 - ((uParam - (1.0/uMaxSwitch)) / (1.0/uMaxSwitch))) * fSize + fOffset;
		f3Position.y = (1.0 / 1.0) * fSize + fOffset;
		f3Position.z = (0.0 + ((vParam - (2.0/vMaxSwitch)) / (1.0/vMaxSwitch))) * fSize + fOffset;

		(f3Normal.y)++;					// See (*) below
/*
		if(uParam == (1.0/uMaxSwitch))			// See (**) below
			(f3Normal.x)++;
		if(uParam == (2.0/uMaxSwitch))			// See (**) below
			(f3Normal.x)--;
		if(vParam == (3.0/vMaxSwitch))			// See (**) below
			(f3Normal.z)++;
*/		
	}

	if((1.0/vMaxSwitch) < vParam && vParam < (2.0/vMaxSwitch)){		// UV is on one of the middle faces
		if((0.0/uMaxSwitch) < uParam && uParam < (1.0/uMaxSwitch)){	// UV is on Left face
			f3Position.x = (1.0 / 1.0) * fSize + fOffset;
			f3Position.y = (0.0 + ((vParam - (1.0/vMaxSwitch)) / (1.0/vMaxSwitch))) * fSize + fOffset;
			f3Position.z = (1.0 - ((uParam - (0.0/uMaxSwitch)) / (1.0/uMaxSwitch))) * fSize + fOffset;

			(f3Normal.x)++;				// See (*) below
/*
			if(uParam == (0.0/uMaxSwitch))		// See (**) below
				(f3Normal.z)++;
			if(vParam == (1.0/vMaxSwitch))		// See (**) below
				(f3Normal.y)--;
			if(vParam == (2.0/vMaxSwitch))		// See (**) below
				(f3Normal.y)++;
*/
		}
		
		if((1.0/uMaxSwitch) < uParam && uParam < (2.0/uMaxSwitch)){	// UV is on Front face
			f3Position.x = (1.0 - ((uParam - (1.0/uMaxSwitch)) / (1.0/uMaxSwitch))) * fSize + fOffset;
			f3Position.y = (0.0 + ((vParam - (1.0/vMaxSwitch)) / (1.0/vMaxSwitch))) * fSize + fOffset;
			f3Position.z = (0.0 / 1.0) * fSize + fOffset;

			(f3Normal.z)--;				// See (*) below
			
		}
		
		if((2.0/uMaxSwitch) < uParam && uParam < (3.0/uMaxSwitch)){	// UV is on Right face
			f3Position.x = (0.0 / 1.0) * fSize + fOffset;
			f3Position.y = (0.0 + ((vParam - (1.0/vMaxSwitch)) / (1.0/vMaxSwitch))) * fSize + fOffset;
			f3Position.z = (0.0 + ((uParam - (2.0/uMaxSwitch)) / (1.0/uMaxSwitch))) * fSize + fOffset;

			(f3Normal.x)--;				// See (*) below
/*
			if(vParam == (1.0/vMaxSwitch))		// See (**) below
				(f3Normal.y)--;
			if(vParam == (2.0/vMaxSwitch))		// See (**) below
				(f3Normal.y)++;
*/
		}
		
		if((3.0/uMaxSwitch) < uParam && uParam < (4.0/uMaxSwitch)){	// UV is on Back face
			f3Position.x = (0.0 + ((uParam - (3.0/uMaxSwitch)) / (1.0/uMaxSwitch))) * fSize + fOffset;
			f3Position.y = (0.0 + ((vParam - (1.0/vMaxSwitch)) / (1.0/vMaxSwitch))) * fSize + fOffset;
			f3Position.z = (1.0 / 1.0) * fSize + fOffset;

			(f3Normal.z)++;				// See (*) below
/*
			if(uParam == (4.0/uMaxSwitch))		// See (**) below
				(f3Normal.x)++;
			if(vParam == (1.0/vMaxSwitch))		// See (**) below
				(f3Normal.y)--;
			if(vParam == (2.0/vMaxSwitch))		// See (**) below
				(f3Normal.y)++;
*/
		}
		
		
	}
	
	if((0.0/vMaxSwitch) < vParam && vParam < (1.0/vMaxSwitch)){		// UV is on down Face
		f3Position.x = (1.0 - ((uParam - (1.0/uMaxSwitch)) / (1.0/uMaxSwitch))) * fSize + fOffset;
		f3Position.y = (0.0 / 1.0) *fSize + fOffset;
		f3Position.z = (1.0 - ((vParam - (0.0/vMaxSwitch)) / (1.0/vMaxSwitch))) * fSize + fOffset;

		(f3Normal.y)--;					// See (*) below
/*
		if(uParam == (1.0/uMaxSwitch))			// See (**) below
			(f3Normal.x)++;
		if(uParam == (2.0/uMaxSwitch))			// See (**) below
			(f3Normal.x)--;
		if(vParam == (0.0/vMaxSwitch))			// See (**) below
			(f3Normal.z)++;
*/	
	}
	
	

	//	(*)	- Will automatically Multi-count for edges & corners adjacent in the cube and also adjacent in the UV-map (i.e. UV=[(1.0/uMaxSwitch), (1.0/vMaxSwitch)])
	//	(**)	- Will manually Multi-count for edges & corners adjacent in the cube bot not adjacent in the UV-map (i.e. UV=[(1.0/uMaxSwitch), (0.0/vMaxSwitch)])

	
	
	
	f3Normal = f3Normal.normalize();	// get rid of the Mult-counting on edges & corners (Double-counting on Edges, Tripple-counting on Corners)
	var f3uv = new Vector2d(uParam, vParam);	
	var f3Surface = new Surface3d(f3Position,f3Normal,f3uv);
	
	return f3Surface;
	
}
