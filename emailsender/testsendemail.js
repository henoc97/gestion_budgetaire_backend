var fs = require('fs');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'amaviganhenoc@gmail.com',
    pass: 'ywcw yghq kqtj otae'
  }
});

fs.readFile('email_template.html', 'utf8', function (err, htmlData) {
  if (err) {
    console.error("Unable to read HTML file: ", err);
    return;
  }

  var mailOptions = {
    from: 'amaviganhenoc@gmail.com',
    to: 'nononephew@gmail.com',
    subject: 'Bienvenue dans notre application de gestion budgétaire',
    html: htmlData
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});
