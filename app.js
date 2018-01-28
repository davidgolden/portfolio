var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    nodemailer = require('nodemailer');

app.use(express.static(__dirname +'/public'));
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.render('index.html');
})

app.post('/', function(req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let message = req.body.message;

    let sendEmail = function(name, email, message) {
        var transporter = nodemailer.createTransport({
                    service: 'Mailgun',
                    auth: {
                        user: process.env.MAILUSER,
                        pass: process.env.MAILPASS
                    }
                });

                var mailOptions = {
                    from: email, // sender address
                    to: 'davidgoldeninbox@gmail.com', // list of receivers
                    subject: `Message from ${name}`, // Subject line
                    html: message // html body
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    console.log('called');
                    if (error) {
                        console.log(error);
                        res.send('error');
                    } else {
                        console.log('sent');
                        res.send('sent');
                    }
                });
    }
    sendEmail(name, email, message);
})

app.get('*', function(req, res) {
    res.redirect('/');
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
