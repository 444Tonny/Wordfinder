<?php
    require('config.php');
    if (isset($_REQUEST['username'], $_REQUEST['password']))
    {
        // récupérer le nom d'utilisateur et supprimer les antislashes ajoutés par le formulaire
        $username = stripslashes($_REQUEST['username']);
        $username = mysqli_real_escape_string($conn, $username); 

        // récupérer le mot de passe et supprimer les antislashes ajoutés par le formulaire
        $password = stripslashes($_REQUEST['password']);
        $password = mysqli_real_escape_string($conn, $password);

        //requéte SQL + mot de passe crypté
        $query = "INSERT into `users` (username, password)
                    VALUES ('$username', '".hash('sha256', $password)."')";

        // Exécuter la requête sur la base de données
        $res = mysqli_query($conn, $query);
        if($res)
        {
            echo "<div class='sucess'>
                <h3>Vous êtes inscrit avec succès.</h3>
                <p>Cliquez ici pour vous <a href='index.php'>connecter</a></p>
            </div>";
        }
    }
?>