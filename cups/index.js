#!/usr/bin/env node

const https = require('https'),
  ipp = require('ipp'),
  fs = require('fs'),
  PDFDocument = require('pdfkit'),
  printer = ipp.Printer("http://127.0.0.1:631/printers/DYMO_LabelWriter_450_Turbo")

function print() {
  fs.readFile('./test-label.pdf', function (err, data) {
    if (err)
      throw err;
    var msg = {
      "operation-attributes-tag": {
        "requesting-user-name": "User",
        "job-name": "My Test Job",
        "document-format": "application/pdf"
      },
      data: data
    };
    printer.execute("Print-Job", msg, function (err, res) {
      console.log(res);
      console.error(err);
    });
  });
  // // var doc = new PDFDocument({
  // // size: [165, 288],// 30256 DYMO Large Shipping Labels
  // // margins: 1
  // // });
  // var doc = new PDFDocument;
  // doc.pipe(fs.createWriteStream('/path/to/file.pdf'));

  // var buffers = [];
  // doc.on('data', buffers.push.bind(buffers));
  // doc.on('end', function () {
  //   var file = {
  //     "operation-attributes-tag": {
  //       "requesting-user-name": "User",
  //       "job-name": "Print Job",
  //       "document-format": "application/pdf"
  //     },
  //     data: Buffer.concat(buffers)
  //   };

  //   printer.execute("Print-Job", file, function (err, res) {
  //     console.log('Printed: ' + res.statusCode);
  //     console.log(res);
  //     // Callback
  //     var x = {
  //       'type': 'printback',
  //       'data': res
  //     };
  //     // client.send('kidddox' + db.settings.id, JSON.stringify(x))
  //   });
  // });

  // LANDSCAPE TAG
  // doc.rotate(90);
  // FIRST PDF PAGE IS AUTOMATICALLY CREATED

  // doc.end();
  console.log('Printing...');
}

print();