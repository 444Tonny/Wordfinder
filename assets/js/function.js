let design = localStorage.getItem('mode') ?? "dark";
localStorage.setItem('mode', design);

function lengthSelect(wordLengthString, wordLengthValue) 
{
    WORD_LENGTH = wordLengthValue;
    sessionStorage.wordLength = wordLengthValue;
    sessionStorage.wordLengthString = wordLengthString;
    location.reload();
};

function switchDesign()
{
    if(localStorage.getItem('mode') == "dark") localStorage.setItem('mode', "light");
    else localStorage.setItem('mode', "dark");
}

function lightdarkmode(isSwitched = true)
{
    if (isSwitched == true) switchDesign();
    else 
    {
        if(localStorage.getItem('mode') == "dark") return;
    }

    var element = document.body;

    let btns = document.getElementsByClassName("dropbtn");
    for (let i = 0; i < btns.length; i++) 
    {
        btns[i].classList.toggle("light-btn");
    }

	/*
    let ds = document.getElementById("dropdown-settings");
    ds.classList.toggle("dropdown-light");
	*/

    let options = document.getElementsByClassName("option");
    for (let i = 0; i < options.length; i++) 
    {
        options[i].classList.toggle("hover-light");
    }

    element.classList.toggle("light-mode");
}