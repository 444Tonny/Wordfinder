<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/excel.css">
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
            <li><a class="menu__item" href="#">Home</a></li>
            <li><a class="menu__item" href="#">Administrators</a></li>
            <li><a class="menu__item" href="excel.php">Manage Game</a></li>
            <li><a class="menu__item" href="#">Help</a></li>
            <li><a class="menu__item" href="#">Log out</a></li>
            </ul>
        </div>
    </header>

    <div class="container">
        <span class="message">
            File uploaded successfully !
        </span>

        <form action="controller/uploadController.php" method="post" enctype="multipart/form-data">
            Select image to upload:
            <input type="file" name="fileToUpload" id="fileToUpload">
            <input type="submit" value="Upload Image" name="submit">
        </form>
    </div>

</body>
</html>