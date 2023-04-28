<?php require('controller/routesAuthController.php'); ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/layout.css?v1">
    <link rel="stylesheet" href="css/excel.css?v9">
    <link rel="stylesheet" href="css/help.css?v5">

    <script src="../node_modules/jquery/dist/jquery.min.js" type="text/javascript"></script>
    <script src="https://apis.google.com/js/api.js"></script>
    <script src="https://apis.google.com/js/client.js"></script>
    <script src="https://apis.google.com/js/client:plusone.js" type="application/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2014-11-29/FileSaver.min.js"></script>

    <link href="../node_modules/@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css" rel="stylesheet"
        type="text/css" />
    <script type="text/javascript"
        src="../node_modules/@grapecity/spread-sheets/dist/gc.spread.sheets.all.min.js"></script>
    <script type="text/javascript"
        src="../node_modules/@grapecity/spread-excelio/dist/gc.spread.excelio.min.js"></script>
    <title>Editor</title>

    <meta name="google-signin-client_id"
        content="337137810338-srvid0gaqrfslv773m2d37fr25cmetnh.apps.googleusercontent.com">
</head>

<body>
    <script src="//load.sheetsu.com"></script>
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

    <button class="help" id="help">?</button>
    <div id="manual" class=manual style="display:none;">
        <div class="manual-back"></div>
        <div class="manual-content">
            <h2>HELP</h2>
            <span> <a class="num">1</a> Choose the category of words you want to edit.</span>
            <span> <a class="num">2</a> Write only on the first column (A).</span>

            <button id="manual-close">Understand</button>
        </div>
    </div>

    <script>
        
        var link = "1XRc4j6z7Bx3bnmdg8e_kTwBBB54OU7rLFX5pZrDfGxI";

        function open_editor() {
            
            window.open(link);
            /*
            var openSpreadsheetBtn = document.getElementById("openSpreadsheetBtn");
            openSpreadsheetBtn.onclick = function() {
                window.open(spreadsheetUrl, '_blank', 'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=780, height=200');
            };
            */
        };
    </script>
    
    </br>
    </br>
    </br>

    <div class="sections">
        <div class="section-1">
            <button class="words-length wl4" onclick="open_editor()">HTML EDITOR</button>
        </div>
    </div>

    <script src="excel.js?v18"></script>
    <script src="js/help.js?v1"></script>
</body>

</html>