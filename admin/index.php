<?php require('controller/loginController.php'); ?>

<!DOCTYPE html>
<html>
    <head>
    <link rel="stylesheet" href="css/login.css?v1" />
    </head>

    <body>
        <form class="box" action="" method="post" name="login">
            <h1 class="box-logo box-title">WORD <a class="custom-4">4</a>-<a class="custom-9">9</a></h1>
            <input type="text" class="box-input" name="username" placeholder="Username...">
            <input type="password" class="box-input" name="password" placeholder="Password...">
            <input type="submit" class="box-button" value="LOG IN" name="submit" >
            <?php if (! empty($message)) { ?>
                <span class="errorMessage"><?php echo $message; ?></span>
            <?php } ?>
        </form>
    </body>

</html>