<?php
    session_start();
    unset($_SESSION["loginWF"]);
    header("Location:../index.php");
?>