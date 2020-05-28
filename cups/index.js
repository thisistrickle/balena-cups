#!/usr/bin/env node

const https = require('https'),
  ipp = require('ipp'),
  PDFDocument = require('pdfkit'),
  printer = ipp.Printer("http://127.0.0.1:631/printers/DYMO_LabelWriter_450_Turbo")

function print() {
  var doc = new PDFDocument({
    size: [165, 288],// 30256 DYMO Large Shipping Labels
    margins: 1
  });

  var buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', function () {
    var file = {
      "operation-attributes-tag": {
        "requesting-user-name": "User",
        "job-name": "Print Job",
        "document-format": "application/pdf"
      },
      data: Buffer.concat(buffers)
    };

    printer.execute("Print-Job", file, function (err, res) {
      console.log('Printed: ' + res.statusCode);
      console.log(res);
      // Callback
      var x = {
        'type': 'printback',
        'data': res
      };
      // client.send('kidddox' + db.settings.id, JSON.stringify(x))
    });
  });

  // LANDSCAPE TAG
  doc.rotate(90);
  // FIRST PDF PAGE IS AUTOMATICALLY CREATED
  var firsttag = true;
  // LOOP THROUGH EACH CHILD & ADD LABELS
  // for (var i = 0; i < kids.length; i++) {
  //   var id = kids[i].id;
  //   var code = kids[i].code;
  //   var p = db.person[id];
  //   // GET QUANTITY OF LABELS TO PRINT
  //   var qty = 0, s = db.settings;
  //   if (s.useRooms == 1) {
  //     qty = db.room[p.roomid].tags
  //   } else if (s.useGrades == 1) {
  //     qty = db.grade[p.grade].tags
  //   }
  //   if (s.useRooms == 0 && s.useGrades == 0) { return }
  //   console.log(qty + ' tags will print for ' + p.first);

  //   // FORMAT LABEL
  //   for (var q = 0; q < qty; q++) {
  //     totalLabels++;
  //     if (firsttag) {
  //       firsttag = false
  //     } else {
  //       doc.addPage().rotate(90)
  //     }
  //     // FIRST NAME
  //     doc.fontSize(36).font('Helvetica-Bold').text(p.first, 15, -150);
  //     // LAST NAME
  //     doc.fontSize(16).font('Helvetica').text(p.last, 16, -117);
  //     // DIVIDING LINE
  //     doc.lineWidth(4).lineCap('butt').moveTo(16, -100).lineTo(273, -100).stroke();
  //     // GENDER
  //     var gender = (p.gender == 1) ? 'Male' : 'Female';
  //     doc.fontSize(20).font('Helvetica-Bold').text(gender, 16, -94);
  //     // AGE
  //     doc.text(getAge(p.birthdate), 70, -94, { width: 200, align: 'right' });
  //     // ROOM
  //     var room = (p.roomid && p.roomid !== '') ? 'Room: ' + db.room[p.roomid].name : '';
  //     doc.fontSize(14).text(room, 16, -77);
  //     // GRADE
  //     var grade = (p.grade && p.grade !== '') ? 'Grade: ' + db.grade[p.grade].name : '';
  //     doc.text(grade, 71, -77, { width: 200, align: 'right' });
  //     // NOTES
  //     var notes = (p.notes && p.notes !== '') ? 'Allergies/Notes:' : '';
  //     doc.fontSize(10).font('Helvetica').text(notes, 17, -62);
  //     // NOTES DESCRIPTION
  //     var noteson = (p.notes && p.notes !== '') ? p.notes : '';
  //     doc.fontSize(9).text(noteson, 17, -50, { width: 170 });
  //     // TIMESTAMP
  //     doc.fontSize(7).text(timestamp(), 17, -20);
  //     // GRAY BOX BEHIND CODE
  //     doc.lineWidth(44).strokeColor('gray').lineCap('butt').moveTo(190, -36).lineTo(273, -36).stroke();
  //     // SECURITY CODE
  //     doc.fontSize(40).font('Helvetica-Bold').fillColor('white').text(code, 182, -52, { width: 100, align: 'center' });
  //   }
  // }
  doc.end();
  console.log('Printing...');
}

print();