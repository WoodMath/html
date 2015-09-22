<?php
	header('Content-disposition: attachment; filename=testnew.txt');
	header('Content-type: text/plain');
	readfile('test.txt');


	/* http://www.boutell.com/newfaq/creating/forcedownload.html */

?>
