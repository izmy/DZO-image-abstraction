<?php
	$img = $_POST['photo'];
	$img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$fileData = base64_decode($img);
	//saving
	$fileName = 'photo-' . time() . '.png';
	file_put_contents('../photos/' . $fileName, $fileData);
