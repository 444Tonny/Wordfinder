<!DOCTYPE html>
<html>
    <head>
    <link rel="stylesheet" href="css/style.css" />
    </head>

    <body>
    <?php ?>
        <form class="box" action="controller/registerController.php" method="post">
        <h1 class="box-logo box-title">WORD 4-9</h1>
            <h1 class="box-title">Register</h1>
        <input type="text" class="box-input" name="username" placeholder="Nom d'utilisateur" required />
            <input type="password" class="box-input" name="password" placeholder="Mot de passe" required />
            <input type="submit" name="submit" value="S'inscrire" class="box-button" />
            <p class="box-register"><a href="index.php">Log in</a></p>
        </form>
    </body>
</html>