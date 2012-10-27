<?
	$s 		= print_r($_REQUEST, 1);
	$oFile 	= fopen('log.txt', 'a');
	fwrite($oFile, $s);
	fwrite($oFile, "\n".'=============================='."\n");
	fclose($oFile);
	print $s;
?>