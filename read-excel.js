export var allWords;
export var rightWord;

var workbook;

document.querySelectorAll("[id=selected-letters]").forEach(item => {

    item.addEventListener('click', exportExcel);
});

export function exportExcel() {
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
            console.log("RW =" + rightWord);
        };

        reader.readAsBinaryString(file);
    }
    xhr.send();
}