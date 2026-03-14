// Partners Budget — Apps Script
// Задеплой как Web App: "Все" могут обращаться

var SHEET_NAME = 'Budget';

function doGet(e) {
  var action = e && e.parameter && e.parameter.action;

  // --- Загрузка данных ---
  if (action === 'load') {
    var ss   = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    var data  = { plan: {}, fact: {} };

    if (sheet && sheet.getLastRow() >= 3) {
      var rows = sheet.getRange(2, 1, 2, 13).getValues();
      for (var col = 1; col <= 12; col++) {
        data.plan[col] = rows[0][col] === '' ? '' : String(rows[0][col]);
        data.fact[col] = rows[1][col] === '' ? '' : String(rows[1][col]);
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // --- Сохранение данных (через GET чтобы не было CORS) ---
  if (action === 'save') {
    var raw  = e.parameter.data;
    var data = JSON.parse(decodeURIComponent(raw));
    _writeData(data);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService
    .createTextOutput('Partners Budget API')
    .setMimeType(ContentService.MimeType.TEXT);
}

function _writeData(data) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

  var months = ['', 'Янв','Фев','Март','Апр','Май','Июнь','Июль','Авг','Сент','Окт','Нояб','Дек'];
  sheet.getRange(1, 1, 1, 13).setValues([months]);

  var planRow = ['план'];
  var factRow = ['факт'];
  for (var i = 1; i <= 12; i++) {
    planRow.push(data.plan && data.plan[i] !== undefined ? Number(data.plan[i]) || data.plan[i] : '');
    factRow.push(data.fact && data.fact[i] !== undefined ? Number(data.fact[i]) || data.fact[i] : '');
  }
  sheet.getRange(2, 1, 1, 13).setValues([planRow]);
  sheet.getRange(3, 1, 1, 13).setValues([factRow]);
}
