<?php
    require('/../config/database.php');

    if(isset($_REQUEST["save_text"]))
    {
        $i = 0;

        for ($i = 0; $i < 14; $i++)
        {
            $num = $i + 1;
            $query = "UPDATE texts SET content = '" . $_POST["text".$num] . "' WHERE id_text = 'text".$num."'";

            mysqli_query($conn, $query);
        }
        
        header("Location:../CMS.php");
    }

    $query2 = "SELECT * FROM `texts` order by id_text + 0 ";
    $text = mysqli_fetch_all(mysqli_query($conn, $query2), MYSQLI_ASSOC);
?>