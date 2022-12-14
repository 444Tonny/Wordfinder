<?php
    $currentDir = getcwd();
    $uploadDirectory = "/../excel-files/";

    var_dump("OUT");

    if (!empty($_FILES['fileAjax'])) 
    {
        var_dump("IN");
        $fileName = $_FILES['fileAjax']['name'];
        var_dump($fileName);
        $fileTmpName = $_FILES['fileAjax']['tmp_name'];

        $uploadPath = $currentDir . $uploadDirectory . basename($fileName);
        var_dump($uploadPath);

        if (isset($fileName)) {

            if(file_exists($uploadPath)) {
                var_dump(" copie suppression");
                $file = fopen($uploadPath, "r");
                fclose($file);
                chmod($uploadPath,465); //Change the file permissions if allowed
                unlink($uploadPath); //remove the file

                echo ($fileName . " copie suppression");
            }

            $didUpload = move_uploaded_file($fileTmpName, $uploadPath);
            
            if ($didUpload) {
                echo 'The file ' . basename($fileName) . ' has been uploaded.';
            } else {
                echo 'An error occurred while uploading. Try again.';
            }
        }
    }
?>