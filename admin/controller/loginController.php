<?php 
    require('config.php');
    session_start();

    if (isset($_POST['username'])){
        $username = stripslashes($_REQUEST['username']);
        $username = mysqli_real_escape_string($conn, $username);
        $password = stripslashes($_REQUEST['password']);
        $password = mysqli_real_escape_string($conn, $password);
        var_dump(hash('sha256', $password));
            $query = "SELECT * FROM `users` WHERE username='$username' and password='".hash('sha256', $password)."'";
        $result = mysqli_query($conn,$query) or die(mysql_error());
        $rows = mysqli_num_rows($result);
        if($rows==1){
            $_SESSION['username'] = $username;
            header("Location: home.php");
        }else{
            $message = "Le nom d'utilisateur ou le mot de passe est incorrect.";
        }
    }
?>