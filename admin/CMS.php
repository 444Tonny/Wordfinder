<?php 
    require('controller/routesAuthController.php');
    require('controller/cmsController.php');
?>


<!DOCTYPE html>
<html lang="en">
<head>
    
    <script src="../node_modules/jquery/dist/jquery.min.js" type="text/javascript"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/home.css?v2">
    <link rel="stylesheet" href="css/cms.css?v2">
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
                <li><a class="menu__item" href="CMS.php">CMS</a></li>
                <li><a class="menu__item" href="administrator.php">Administrators</a></li>
                <li><a class="menu__item" href="excel.php">Words</a></li>
                <li><a class="menu__item" href="controller/logoutController.php">Log out</a></li>
            </ul>
        </div>
    </header>

    <div class="welcome">
        <span class="welcome-text">
            Content Management System (CMS)
            <br>
            <br>
            <br>
            <form action="controller/cmsController.php" class="cms" method="POST">
                <span class="row">
                    <label for="text1">Wat is word6.nl ?</label>   
                    <textarea id="text1" name="text1"><?php echo $text[0]["content"] ?></textarea>
                </span>
                <span class="row">
                    <label for="text1">Groene, gele en zwarte blokjes</label>   
                    <textarea id="text2" name="text2"><?php echo $text[1]["content"] ?></textarea>
                    <textarea id="text3" name="text3"><?php echo $text[2]["content"] ?></textarea>
                    <textarea id="text4" name="text4"><?php echo $text[3]["content"] ?></textarea>
                </span>
                <span class="row">
                    <label for="text1">Tip</label>   
                    <textarea id="text5" name="text5"><?php echo $text[4]["content"] ?></textarea>
                </span>
                <span class="row">
                    <label for="text1">Timer</label>   
                    <textarea id="text6" name="text6"><?php echo $text[5]["content"] ?></textarea>
                </span>
                <span class="row">
                    <label for="text1">Question & Answer 1</label>   
                    <textarea id="text7" name="text7"><?php echo $text[6]["content"] ?></textarea>
                    <textarea id="text8" name="text8"><?php echo $text[7]["content"] ?></textarea>
                    <label for="text1">Question & Answer 2</label>  
                    <textarea id="text9" name="text9"><?php echo $text[8]["content"] ?></textarea>
                    <textarea id="text10" name="text10"><?php echo $text[9]["content"] ?></textarea>
                    <label for="text1">Question & Answer 3</label>  
                    <textarea id="text11" name="text11"><?php echo $text[10]["content"] ?></textarea>
                    <textarea id="text12" name="text12"><?php echo $text[11]["content"] ?></textarea>
                    <label for="text1">Question & Answer 4</label>  
                    <textarea id="text13" name="text13"><?php echo $text[12]["content"] ?></textarea>
                    <textarea id="text14" name="text14"><?php echo $text[13]["content"] ?></textarea>
                    <br>
                    <br>
                </span>
                <input class="save" type="submit" value="SAVE" name="save_text">
            </form>

        </span>
    </div>
    <script src="js/home.js"></script>
</body>
</html>