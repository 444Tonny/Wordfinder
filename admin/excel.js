var excelIO, workbook;
var WORDS_LENGTH;
var EXCEL_FILE;
var EXCEL_URL;

$(document).ready(function () {
    $.support.cors = true;
    workbook = new GC.Spread.Sheets.Workbook(document.getElementById("ss"));
    excelIO = new GC.Spread.Excel.IO();
});

function changeTitle(wordslengthvalue)
{
    document.getElementById("title-length").innerText = wordslengthvalue;

    /* Show buttons */
    document.getElementById('hide1').style.display = 'flex';
    document.getElementById('hide2').style.display = 'flex';
    document.getElementById('hide3').style.display = 'flex';

    const element = document.getElementById('hide1');
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function importWords(wordslength, wordslengthvalue) {

    changeTitle(wordslengthvalue);

    WORDS_LENGTH = wordslength;
    EXCEL_FILE = WORDS_LENGTH + ".xlsx"
    EXCEL_URL = "../excel-files/" + EXCEL_FILE;

    var oReq = new XMLHttpRequest();
    oReq.open('get', EXCEL_URL, true);
    oReq.setRequestHeader("Cache-Control", "no-cache");
    oReq.responseType = 'blob';
    oReq.onload = function () {
        var blob = oReq.response;
        excelIO.open(blob, LoadSpread, function (message) {
            console.log(message);
        });
    };
    oReq.send(null);
}

function LoadSpread(json) {
    jsonData = json;
    workbook.fromJSON(json);

    workbook.setActiveSheet(EXCEL_URL);
}

/** Add data */

document.getElementById("add-word").onclick = function () {

    workbook.suspendPaint();
    workbook.suspendCalcService();

    var new_word = document.getElementById("new-word").value;
    new_word = new_word.trim().toLowerCase();

    if (new_word == "") {
        alert("Input cannot be blank");
        return;
    }

    var sheet = workbook.getActiveSheet();

    // Count row
    var last = _getLastNonEmptyRow(sheet);

    sheet.addRows(last, 1);
    sheet.setValue(last, 0, new_word);

    ExportFile("New word added: " + new_word, "An erroc occured ! Make sure to close all excel files");

    workbook.resumeCalcService();
    workbook.resumePaint();
}

function _getLastNonEmptyRow(sheet) {
    try {
        let rows = Object.keys(sheet.toJSON().data.dataTable);
        //the largest Row index is available at the last of the array
        return 1 + +rows[rows.length - 1];
        
    } catch (error) {
        return 0;
    }
  }


/** update */


document.getElementById("update").onclick = function () {

    workbook.suspendPaint();
    workbook.suspendCalcService();

    ExportFile("File updated succesfully !", "Update failed ! Make sure to close all excel files");

    workbook.resumeCalcService();
    workbook.resumePaint();
}

/** Delete */

document.getElementById("delete").onclick = function() {
        
    var sheet = workbook.getActiveSheet();
    var count = sheet.getRowCount();

    alert(count);

    for(var i = 1 ; i < count ; i++)
    {
        sheet.deleteRows(1, i);
        alert(i);
    }
    
    sheet.deleteRows(1, 0);
    sheet.deleteRows(0, 0);

    workbook.suspendPaint();
    workbook.suspendCalcService();

    ExportFile("All entry deleted succesfully !", "Delete failed ! Make sure to close all excel files");

    workbook.resumeCalcService();
    workbook.resumePaint();
}

/** Add rows */

function addMultipleRows(rowsCount)
{
    var sheet = workbook.getActiveSheet();

    // Count row
    var last = _getLastNonEmptyRow(sheet);

    for(var i = last ; i < last + rowsCount ; i++)
    {  
        sheet.addRows(i, 1);
    }

    workbook.suspendPaint();
    workbook.suspendCalcService();

    ExportFile("Rows added succesfully !", "An error occured ! Make sure to close all excel files");

    workbook.resumeCalcService();
    workbook.resumePaint();
}

/** Export */

function ExportFile(custom_success_message, custom_error_message) {

    var json = JSON.stringify(workbook.toJSON());

    excelIO.save(json, function (blob) {

        var formData = new FormData();
        formData.append('fileAjax', blob, EXCEL_URL);

        fetch("http://localhost:8080/word4-9/admin/uploadHandling.php", {
            method: "POST",
            body: formData,
        })
            .then()
            .then((data) => {
                alert(custom_success_message);
            })
            .catch((error) => {
                console.error(error);
            });

    }, function (e) {
        if (e.errorCode === 1) {
            alert(custom_error_message);
            console.log(e);
        }
    });
}