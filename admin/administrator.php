<?php require('controller/administratorController.php'); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/administrator.css?v2">
    <link rel="stylesheet" href="css/help.css?v2">
    <title>Administrator</title>
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
                <li><a class="menu__item" href="administrator.php">Administrators</a></li>
                <li><a class="menu__item" href="excel.php">Words</a></li>
                <li><a class="menu__item" href="#">Log out</a></li>
            </ul>
        </div>
    </header>

    <button class="help" id="help">?</button>
    <div id="manual" class=manual style="display:none;">
        <div class="manual-back"></div>
        <div class="manual-content">
            <h2>HELP</h2>
            <span> <a class="num">1</a> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae, nulla dolor in rem autem</span>
            <span> <a class="num">2</a> Alias itaque sapiente omnis aliquid! Placeat suscipit molestiae, nobis officia quas debitis ut distinctio hic iste!</span>
            <span> <a class="num">3</a> Alias itaque sapiente omnis aliquid! Placeat suscipit molestiae, nobis officia </span>
            <span> <a class="num">4</a> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae, nulla dolor in rem autem</span>
            <span> <a class="num">5</a> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae, nulla dolor in rem autem</span>
            <span> <a class="num">6</a> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae, nulla dolor in rem autem</span>
            <button id="manual-close">Understand</button>
        </div>
    </div>

    <div class="container">
        
        <?php if (! empty($_GET['message'])) { ?>
            <span class="errorMessage"><?php echo $_GET['message']; ?></span>
        <?php } ?>

        <table>
            <caption>Administrator List</caption>
            <thead>
                <tr>
                <th scope="col">Account ID</th>
                <th scope="col">Username</th>
                <th scope="col">Password</th>
                <th scope="col">Delete user</th>
                </tr>
            </thead>
            <tbody>

                <?php 
                    if (mysqli_num_rows($result) > 0) 
                    {
                        while($row = mysqli_fetch_assoc($result)) 
                        { 
                            $id = $row["id"]; ?>
                            <tr>
                                <td> <?php echo $row["id"] ?> </td>
                                <td> <?php echo $row["username"] ?> </td>
                                <td> <button class="button-change" onclick="changePassword('<?php echo $id ?>')">Change</button> </td>
                                <td> <?php echo '<a class="delete" href="administrator.php?delete=' .$id. '">Delete</a>' ?> </td>
                            </tr>
                        <?php
                        }
                    } 
                    else 
                    { ?>
                        <tr>
                            <td> ... </td>
                            <td> ... </td>
                            <td> ... </td>
                            <td> ... </td>
                        </tr>
                    <?php }
                    
                    mysqli_close($conn);
                ?>
            </tbody>
        </table>
             
        <div class="register">
            <h1 class="register-title">Register a new administrator</h1>
            <form class="register-form" action="controller/administratorController.php" method="post">
                <input type="text" class="register-input" name="username" placeholder="Username..." required />
                <input type="password" class="register-input" name="password" placeholder="Password..." required />
                <input type="submit" name="submit" value="Create" class="register-button" />
            </form>
        </div>

        <div class="popup" id="popup">
            <div class="popup-back"></div>
            <div class="popup-container">
                <form action="controller/administratorController.php" class="popup-form" method="post">
                    <label>Old password</label>
                    <input type="password" name="old_password" placeholder="Type here..." required>
                    <br>
                    <label>New password</label>
                    <input type="password" name="new_password" placeholder="Type here..." required>
                    <br>
                    <input type="hidden" id="id_admin" name="id_admin" value="">
                    <input type="submit" value="Change">
                </form>
                <a href="#" id="popup-close">Cancel</a>
            </div>
        </div>             
    </div>
    
    <script src="js/popup.js"></script>
    <script src="js/help.js?v1"></script>
</body>
</html>