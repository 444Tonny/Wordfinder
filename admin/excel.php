<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/layout.css?v1">
    <link rel="stylesheet" href="css/excel.css?v9">
    <link rel="stylesheet" href="css/help.css?v2">

    <script src="../node_modules/jquery/dist/jquery.min.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2014-11-29/FileSaver.min.js"></script>

    <link href="../node_modules/@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css" rel="stylesheet"
        type="text/css" />
    <script type="text/javascript"
        src="../node_modules/@grapecity/spread-sheets/dist/gc.spread.sheets.all.min.js"></script>
    <script type="text/javascript"
        src="../node_modules/@grapecity/spread-excelio/dist/gc.spread.excelio.min.js"></script>
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

    <div class="sections">
        <div class="section-1">
            <button class="words-length wl4" onclick="importWords('four', 4)" value="four">4 WORDS</button>
            <button class="words-length wl5" onclick="importWords('five', 5)" value="five">5 WORDS</button>
            <button class="words-length wl6" onclick="importWords('six', 6)" value="six">6 WORDS</button>
            <button class="words-length wl7" onclick="importWords('seven', 7)" value="seven">7 WORDS</button>
        </div>

        <div class="section-2">
            <h1><a id="title-length"></a> WORDS</h1>
        </div>

        <div id="ss" style="height:600px ; width :100%; "></div>

        <div id="hide1" class="section-3" style="display:none">
            <h1>Edit Excel File</h1>
            <div class="borderbottom">
                <input type="text" id="new-word" required>
                <input type="submit" id="add-word" name="add-word" value="+ ADD WORD">
            </div>
        </div>
        <div id="hide2" class="section-4" style="display:none">
            <div>
                <button class="addMultiple" onclick="addMultipleRows(500)">ADD 500 ROWS</button>
                <button class="addMultiple" onclick="addMultipleRows(1000)">ADD 1000 ROWS</button>
            </div>
        </div>
        <div id="hide3" class="section-4" style="display:none">
            <div>
                <button id="update" name="update">UPDATE FILE</button>
                <button id="delete" name="delete">DELETE ALL</button>
            </div>
        </div>
    </div>

    <div style="display: none;">
        <form>
            <input type="text" id="importUrl" value="words-4.xlsx" style="width:300px" />
            <input id="import" type="button" value="Import">
        </form>

        <button id="add-word">Add Row</button>

        <span class="message">
            File uploaded successfully !
        </span>

        <form action="controller/uploadController.php" method="post" enctype="multipart/form-data">
            Select image to upload:
            <input type="file" name="fileToUpload" id="fileToUpload">
            <input type="submit" value="Upload Image" name="submit">
        </form>
    </div>

    <script src="excel.js?v17"></script>
    <script src="js/help.js?v1"></script>
</body>

</html>