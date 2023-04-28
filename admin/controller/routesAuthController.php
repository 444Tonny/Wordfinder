<?php
    session_start();

    if (!(isset($_SESSION["loginWF"]))) 
    {
        header("Location: index.php");
        exit;
    } 
?>