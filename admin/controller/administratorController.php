<?php 
    require('config.php');
    
    $sql = "SELECT id, username, password FROM users";
    $result = mysqli_query($conn, $sql);

    /*** Register a new admin */
    if (isset($_REQUEST['username'], $_REQUEST['password']))
    {
        $username = stripslashes($_REQUEST['username']);
        $username = mysqli_real_escape_string($conn, $username); 

        $password = stripslashes($_REQUEST['password']);
        $password = mysqli_real_escape_string($conn, $password);

        $query = "INSERT into `users` (username, password)
                    VALUES ('$username', '".hash('sha256', $password)."')";

        mysqli_query($conn, $query);
        mysqli_close($conn);

        $message = urlencode("Admin registered successfully !");
        header("Location: ../administrator.php?message=".$message);
    }

    /** Change password */
    if (isset($_REQUEST['old_password'], $_REQUEST['new_password']))
    {
        $id = $_REQUEST['id_admin'];

        $old_password = stripslashes($_REQUEST['old_password']);
        $old_password = mysqli_real_escape_string($conn, $old_password);

        $new_password = stripslashes($_REQUEST['new_password']);
        $new_password = mysqli_real_escape_string($conn, $new_password);

        $query = "SELECT password FROM `users` WHERE id = $id";

        $result = mysqli_query($conn, $query);
        $row = mysqli_fetch_assoc($result);

        if(strcmp(hash('sha256', $old_password), $row['password']) == 0)
        {
            $query2 = "UPDATE users SET password='".hash('sha256', $new_password)."' WHERE id=".$id;
            mysqli_query($conn, $query2);
            mysqli_close($conn);

            $message = urlencode("Password updated successfully !");
            header("Location:../administrator.php?message=".$message);
        }
        else 
        {   
            $message = urlencode("Old password does not match !");
            mysqli_close($conn);

            header("Location:../administrator.php?message=".$message);
        }

        mysqli_close($conn);
    }

    /*** Delete an admin */
    if (isset($_GET['delete']))
    {
        $id = $_GET['delete'];

        $query_delete = "DELETE FROM users WHERE id = " .$id;
        mysqli_query($conn, $query_delete);

        $message = urlencode("Admin deleted successfully !");
        header("Refresh:0; url=administrator.php");
    }
?>