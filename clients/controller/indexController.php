<?php 
    require('/../config/database.php');

    $query2 = "SELECT value from mode_timer";
    $result = mysqli_query($conn, $query2);
    $delay = mysqli_fetch_assoc($result);
    
    $query3 = "SELECT * FROM `texts` order by id_text + 0 ";
    $text = mysqli_fetch_all(mysqli_query($conn, $query3), MYSQLI_ASSOC);
?>