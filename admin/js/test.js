Client_ID = 337137810338-srvid0gaqrfslv773m2d37fr25cmetnh.apps.googleusercontent.com
client secret = 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
api key = AIzaSyB2Ny7AfLcyb-blIBpUICcwAkHJ7KOVGgs
spread id = 1XRc4j6z7Bx3bnmdg8e_kTwBBB54OU7rLFX5pZrDfGxI

export var allWords;
export var rightWord;

var workbook;

document.querySelectorAll("[id=selected-letters]").forEach(item => {

    item.addEventListener('click', exportExcel);
});

export async function exportExcel() {
    var wordLengthString = sessionStorage.getItem("wordLengthString") ?? "four";

    // (A) NEW FILE READER
    var reader = new FileReader();

    var EXCEL_FILENAME = wordLengthString + ".xlsx";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "excel-files/" + EXCEL_FILENAME, true);
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.responseType = "blob";
    xhr.onload = function (e) {
        var file = this.response;
        var workbook;
        reader.onload = function (e) {

            workbook = XLSX.read(e.target.result, { type: "binary" });
            var sheetNames = workbook.SheetNames;
            var worksheet;
            if (sheetNames.length == 1) {
                worksheet = workbook.Sheets[workbook.SheetNames[0]];
            }
            else {
                worksheet = workbook.Sheets[workbook.SheetNames[1]];
            }
            var range = XLSX.utils.decode_range(worksheet["!ref"]);

            var data = [];
            for (let row = range.s.r; row <= range.e.r; row++) {
                let i = data.length;
                data.push([]);
                for (let col = range.s.c; col <= range.e.c; col++) {
                    let cell = worksheet[XLSX.utils.encode_cell({ r: row, c: col })];
                    if (cell == undefined) continue;
                    data[i].push(cell.v);
                }
            }

            allWords = [].concat(...data);
            rightWord = allWords[Math.floor(Math.random() * allWords.length)]
            console.log("Word =" + rightWord);
            return rightWord;
        };

        reader.readAsBinaryString(file);
    }
    xhr.send();
}


function randomNoRepeats(array) {
    var copy = array.slice(0);
    return function() {
      if (copy.length < 1) { copy = array.slice(0); }
      var index = Math.floor(Math.random() * copy.length);
      var item = copy[index];
      copy.splice(index, 1);
      return item;
    };
}



/* 

        <div class="phppot-container">
            <h1>Google Sheets JavaScript API Spreadsheet Tutorial</h1>
            <p>This tutorial is to help you learn on how to read Google
                Sheets (spreadsheet) using JavaScript Google API.</p>
            <button id="authorize_btn" onclick="authorizeGoogleAccess()">Authorize
                Google Sheets Access</button>

            <button id="signout_btn" onclick="signoutGoogle()">Sign
                Out</button>

            <pre id="content"></pre>
        </div>
        <script async defer src="https://apis.google.com/js/api.js" onload="gapiLoaded()"></script>
        <script async defer src="https://accounts.google.com/gsi/client" onload="gisLoaded()"></script>

        <script>
            // You should set your Google client ID and Google API key
            const GOOGLE_CLIENT_ID = '337137810338-srvid0gaqrfslv773m2d37fr25cmetnh.apps.googleusercontent.com';
            const GOOGLE_API_KEY = 'AIzaSyB2Ny7AfLcyb-blIBpUICcwAkHJ7KOVGgs';
            //

            const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

            // Authorization scope should be declared for spreadsheet handing
            // multiple scope can he included separated by space
            const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

            let tokenClient;
            let gapiInited = false;
            let gisInited = false;
            document.getElementById('authorize_btn').style.visibility = 'hidden';
            document.getElementById('signout_btn').style.visibility = 'hidden';

            /**
             * Callback after api.js is loaded.
             */
            function gapiLoaded() {
                gapi.load('client', intializeGapiClient);
            }

            /**
             * Callback after the Google API client is loaded. Loads the
             * discovery doc to initialize the API.
             */
            async function intializeGapiClient() {
                await gapi.client.init({
                    apiKey: GOOGLE_API_KEY,
                    discoveryDocs: [DISCOVERY_DOC],
                });
                gapiInited = true;
                maybeEnableButtons();
            }

            /**
             * Callback after Google Identity Services are loaded.
             */
            function gisLoaded() {
                tokenClient = google.accounts.oauth2.initTokenClient({
                    client_id: GOOGLE_CLIENT_ID,
                    scope: SCOPES,
                    callback: '', // defined later
                });
                gisInited = true;
                maybeEnableButtons();
            }

            /**
             * Enables user interaction after all libraries are loaded.
             */
            function maybeEnableButtons() {
                if (gapiInited && gisInited) {
                    document.getElementById('authorize_btn').style.visibility = 'visible';
                }
            }

            /**
             *  Sign in the user upon button click.
             */
            function authorizeGoogleAccess() {
                tokenClient.callback = async (resp) => {
                    if (resp.error !== undefined) {
                        throw (resp);
                    }
                    document.getElementById('signout_btn').style.visibility = 'visible';
                    document.getElementById('authorize_btn').innerText = 'Refresh';
                    await listMajors();
                };

                if (gapi.client.getToken() === null) {
                    // Prompt the user to select a Google Account and ask for consent to share their data
                    // when establishing a new session.
                    tokenClient.requestAccessToken({ prompt: 'consent' });
                } else {
                    // Skip display of account chooser and consent dialog for an existing session.
                    tokenClient.requestAccessToken({ prompt: '' });
                }
            }

            /**
             *  Sign out the user upon button click.
             */
            function signoutGoogle() {
                const token = gapi.client.getToken();
                if (token !== null) {
                    google.accounts.oauth2.revoke(token.access_token);
                    gapi.client.setToken('');
                    document.getElementById('content').innerText = '';
                    document.getElementById('authorize_btn').innerText = 'Authorize';
                    document.getElementById('signout_btn').style.visibility = 'hidden';
                }
            }

            /**
             * Print the names and majors of students in a sample spreadsheet:
             * https://docs.google.com/spreadsheets/d/1aSSi9jk2gBEHXOZNg7AV7bJj0muFNyPLYwh2GXThvas/edit
             */
            async function listMajors() {
                let response;
                try {
                    // Fetch first 10 files
                    response = await gapi.client.sheets.spreadsheets.values.get({
                        spreadsheetId: '1XRc4j6z7Bx3bnmdg8e_kTwBBB54OU7rLFX5pZrDfGxI',
                        range: 'four!A2:D',
                    });
                } catch (err) {
                    document.getElementById('content').innerText = err.message;
                    return;
                }
                const range = response.result;
                if (!range || !range.values || range.values.length == 0) {
                    document.getElementById('content').innerText = 'No values found.';
                    return;
                }
                const output = range.values.reduce(
                    (str, row) => `${str}${row[0]}, ${row[2]}\n`,
                    'Birds, Insects:\n');
                document.getElementById('content').innerText = output;
            }
        </script>
        */