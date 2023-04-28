export var rightWord;
export var allWords;

// https://docs.google.com/spreadsheets/d/1YtsBctrD4_dDvFpjeYrqB87Bgnj50fsobsEZa6u4Gew/edit#gid=1315683634

export async function exportExcel() {

    return new Promise((resolve, reject) => {

        var lengthAalbe = sessionStorage.getItem("lengthAalbe") ?? "eleven";

        //Création d'un nouvel objet XMLHttpRequest
        var xhr = new XMLHttpRequest();

        //Définir l'URL de la requête
        var url = "https://content-sheets.googleapis.com/v4/spreadsheets/1YtsBctrD4_dDvFpjeYrqB87Bgnj50fsobsEZa6u4Gew/values/" + lengthAalbe + "!A2%3AD?key=AIzaSyB2Ny7AfLcyb-blIBpUICcwAkHJ7KOVGgs";

        console.log(url);

        //Ouvrir une connexion
        xhr.open("GET", url);

        //Envoyer la requête
        xhr.send();

        //Gérer la réponse
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                //traiter les données ici
                var values = data.values;
                allWords = [].concat(...values);
                rightWord = allWords[Math.floor(Math.random() * allWords.length)];
                console.log("RW = " + rightWord);
                resolve(rightWord);
            }
        }
    });
}