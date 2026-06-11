// ================================================================
// LED Light Orders API - Google Apps Script
// Paste this in: script.google.com > New project > Code.gs
// Then: Deploy > New deployment > Web app
//   Execute as: Me
//   Who has access: Anyone
// Copy the Web App URL and paste it in index.html SCRIPT_URL
// ================================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp
      .openById('15y9Xjj9rRlSFuEgHRZNb-WbJj0Yw5JqAH-wI37ez3Xg')
      .getSheetByName('Orders');

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.nom || '',
      data.telephone || '',
      data.ville || '',
      data.adresse || '',
      data.produit || 'Panneau LED PL-26',
      data.prix || '149',
      data.source || 'landing-page',
      'new'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Order saved' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
