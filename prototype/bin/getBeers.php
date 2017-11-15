<?php

	$functionId = $_GET['functionId'];
	$valueId = $_GET['valueId'];

	if ($functionId == 'getBeersByStyleId') getBeersByStyleId( $valueId );

	/*
		Add pagination to echo json array of page count from page 1 
	*/

	function getBeersByStyleId( $id ){
		$json_url = "https://api.brewerydb.com/v2/beers?styleId=". $id  ."&key=865b6a5e9890188485b0004a1563a12a&format=json";

		$json = file_get_contents( $json_url );

		echo json_encode( $json );
	}
?>