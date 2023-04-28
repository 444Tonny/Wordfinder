<?php 
    require('clients/controller/indexController.php'); 
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Aalbessengelei</title>
    <link rel="stylesheet" href="assets/css/header.css?v15">
    <link rel="stylesheet" href="assets/css/aalbe.css?ts=<?=time();?>">
    <link rel="stylesheet" href="assets/css/other-games.css?ts=<?=time();?>">
    <link href="assets/css/toastr.css?v1" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css" />
    <script src="https://kit.fontawesome.com/8256cffc4a.js" crossorigin="anonymous"></script>
</head>

<body id="body">
	
    <header>
        <span class="logo">
            Aalbessengelei
        </span>
        <div class="dropdowns">
            <button id="statistics-btn" class="dropbtn"><i class="fa-solid fa-chart-simple"></i></button>
            <button id="switch-design" class="dropbtn" onclick=switchMode()><i class="fa-solid fa-moon"></i></button>
        </div>
    </header>

    <div class="timer_container">
        <a id="timer">00:00</a>
    </div>

	<div class="alb-body">
        <div class="empty-squares" id="empty-squares">
            <span data-index="0" class="empty-square"></span>
            <span data-index="1" class="empty-square"></span>
            <span data-index="2" class="empty-square"></span>
            <span data-index="3" class="empty-square"></span>
            <span data-index="4" class="empty-square"></span>
            <span data-index="5" class="empty-square"></span>
            <span data-index="6" class="empty-square"></span>
            <span data-index="7" class="empty-square"></span>
            <span data-index="8" class="empty-square"></span>
            <span data-index="9" class="empty-square"></span>
        </div>
        <br>
        <div class="letters-squares">
            <span class="letter-square">-</span>
            <span class="letter-square">-</span>
            <span class="letter-square">-</span>
            <span class="letter-square">-</span>
            <span class="letter-square">-</span>
            <span class="letter-square">-</span>
            <span class="letter-square">-</span>
            <span class="letter-square">-</span>
            <span class="letter-square">-</span>
            <span class="letter-square">-</span>
        </div>
        <div class="game-buttons">
            <button id="shuffle" class="shuffle">Shuffle</button>
            <button id='stop' class="delete">Stop</button>
        </div>
        <div class="third-row">
            <span id="empty-space"></span>
            <button id="delete" class="clear">×</button>
        </div>
        
	</div>
    <div class="center-item">
        <button class="validate" id="replay-button" onclick=reload()>Volgend Spel</button>
    </div>

    <div class="results" id="results">
        <div class="results-back"></div>
        <div class="results-panel">
            <button class="close" id="close-stats" onclick=closeResults()>×</button>
            <div class="r1">
                <span>Het woord is:</span>
                <span id="right-word">........</span>
            </div>
            <div class="r2">
                <span>Gebruikte tijd</span>
                <span id="current-time">xx:xx</span>
            </div>
            <div class="r3">
                <span>
                    <u>Vorige tijd:</u><a id='previous-time'>xx:xx</a>
                </span>
                <span>
                    <u>Gemiddeld:</u><a id='average-time'>xx:xx</a>
                </span>
            </div>
        </div>
    </div>

    <h2>Woord lengte</h2>
    <div class="game-mode">
		<span class="bottom-mode length" id="selected-letters" data-length='eleven' onclick="lengthSelect('eleven')">11 Letters</span>
		<span class="bottom-mode length" id="selected-letters" data-length='twelve' onclick="lengthSelect('twelve')">12 Letters</span>
		<span class="bottom-mode length" id="selected-letters" data-length='thirteen' onclick="lengthSelect('thirteen')">13 Letters</span>
		<span class="bottom-mode length" id="selected-letters" data-length='fourteen' onclick="lengthSelect('fourteen')">14 Letters</span>
	</div>
    <h2>Delay</h2>
    <div class="game-mode">
		<span class="bottom-mode delay" id="selected-letters" data-delay='5000' onclick="delaySelect(5000)">5 seconds</span>
		<span class="bottom-mode delay" id="selected-letters" data-delay='10000' onclick="delaySelect(10000)">10 seconds</span>
		<span class="bottom-mode delay" id="selected-letters" data-delay='30000' onclick="delaySelect(30000)">30 seconds</span>
	</div>

    <script>
        sessionStorage.delaySeconds = (sessionStorage.delaySeconds === undefined) ? 5000 : sessionStorage.delaySeconds;
        sessionStorage.lengthAalbe = (sessionStorage.lengthAalbe === undefined) ? 'eleven' : sessionStorage.lengthAalbe;

        function lengthSelect(wordLengthString) 
        {
            sessionStorage.lengthAalbe = wordLengthString;
            location.reload();
        };

        var spans = document.querySelectorAll('.length');
        for (var i = 0; i < spans.length; i++) {
            if (spans[i].getAttribute('data-length') === sessionStorage.lengthAalbe) {
                spans[i].classList.add('active');
            } else {
                spans[i].classList.remove('active');
            }
        }
        
        function delaySelect(delayValue)
        {
            sessionStorage.delaySeconds = delayValue;
            location.reload(); 
        }

        var spans = document.querySelectorAll('.delay');
        for (var i = 0; i < spans.length; i++) {
            if (spans[i].getAttribute('data-delay') === sessionStorage.delaySeconds) {
                spans[i].classList.add('active');
            } else {
                spans[i].classList.remove('active');
            }
        }

    </script>

    <div id="howtoplay" class="howtoplay">
        <div class="siderail left-banner"><?php // echo $text[10]['content'] ?></div>
        <div class="howtoplay-content">
            <div class="howtoplay-head">
                <h3>Wat is de Paardensprong ?</h3>
            </div>
            <span class="howtoplay-text">
                <?php // echo $text[0]['content'] ?>
            </span>
			<span class="howtoplay-text banner-ad">
                <?php // echo $text[3]['content'] ?>
			</span>
			<br>
			<br>
			
			<span class="howtoplay-text">
				Vragen en opmerkingen voor foute of nieuwe woorden enz.
				<br><br>
				Mail: chippers@chippers.nl
			</span>
        </div>
		<div class="siderail right-banner"><?php // echo $text[11]['content'] ?></div>
    </div>

    <h4>Share on social media</h4>
    <div class='social-media'>
        <!-- Add font awesome icons -->
        <a href="http://www.facebook.com/sharer.php?u=https://word6.nl/" class="fa fa-facebook"></a>
        <a href="http://twitter.com/share?url=https://word6.nl/" class="fa fa-twitter"></a>
        <a href="http://reddit.com/submit?url=https://word6.nl/" class="fa fa-reddit"></a>
        <a href="http://www.linkedin.com/shareArticle?mini=true&url=https://word6.nl/" class="fa fa-linkedin"></a>
    </div>

    <script>
        function reload()
        {
            location.reload();
        }
        function closeResults()
        {
            results.style.display = 'none';
        }
        function switchMode() {
            if (localStorage.getItem('mode') == 'dark') localStorage.setItem('mode', 'light');
            else localStorage.setItem('mode', 'dark');
        }
    </script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <script src="assets/js/aalbe.js?ts=<?=time();?>" type="module"></script>
</body>


</html>