<?php 
    require('controller/routesAuthController.php');
    require('controller/indexController.php');
    
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <script src="../node_modules/jquery/dist/jquery.min.js" type="text/javascript"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/home.css?v2">
    <title>Document</title>
</head>
<body>
    <header>
        <div class="hamburger-menu">
            <input id="menu__toggle" type="checkbox" />
            <label class="menu__btn" for="menu__toggle">
                <span></span>
            </label>

            <ul class="menu__box">
                <li><a class="menu__item" href="home.php">Home</a></li>
                <li><a class="menu__item" href="editor.php">Editor</a></li>
                <li><a class="menu__item" href="administrator.php">Administrators</a></li>
                <li><a class="menu__item" href="excel.php">Words</a></li>
                <li><a class="menu__item" href="controller/logoutController.php">Log out</a></li>
            </ul>
        </div>
    </header>

    <div class="welcome">
        <h1>WORDFINDER</h1>
        <span class="welcome-text">
            Welcome to the administrator panel !
            <br>
            Here you will have full access to the Wordfinder game !
            <br>
            <br>
            <b>MENU</b>
            <br>
            <u>Administrators : </u> <a> Manage the admins of the website. </a>
            <br>
            <u>Html editor : </u> <a> Edit the text & html content of the website. </a> 
            <br>
            <u>Words : </u> <a> Manage the words in the excel files. </a> 
            <br>
            <br>
        </span>
    </div>
    <script src="js/home.js"></script>
</body>
</html>