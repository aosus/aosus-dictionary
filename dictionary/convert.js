let csvToJson = require('convert-csv-to-json');

let fileInputName = './dictionary/techdict.csv'; 
let fileOutputName = './dictionary/techdict.json';

csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);