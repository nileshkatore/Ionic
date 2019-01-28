let express = require('express');
let webPush = require('web-push');

let app = express();

app.listen(8000,function() {
    console.log('Node server started...');
});

let pushSubscription  =  {"endpoint":"https://fcm.googleapis.com/fcm/send/eulkXIDB_iE:APA91bH41QGbIyWSszjmdmRfgXMAPUbVA8tILEllpUxDBZiUx-w_JcIagiuoOsk3PgFQrDXFcMhLLeXaMC8RjG5kEMpTOUytLiCTl-sLNL7Ecdanr-gU2WVWdqKraP03fEWZpFyWQIpH","expirationTime":null,"keys":{"p256dh":"BP7tVnax0Cqgs2NjQKcmdSKOCvssrTupr2D5LpGTttMN8q6lsDzQODbDkuPZSMi6XLZIZ70O7gaUDIjd4dnOewk","auth":"nzo5j4HaDqF2RWwfkJ6lug"}};
let payload = 'Here is a payload!';
let vapidPublicKey = 'BM_mkHE35CTJ3u0wfii0AZOBh1qZH6srq8qe73X3YkphTShGGlT1cPF2kD0G9aTcoW0EaZ5-Y1UH_jNOAj35cy4';
let vapidPrivateKey = 'RowyecF3E-SGVck5rBUdzyzNP9gKTARX_fMLJ4ZixLQ';
let  options = {
    vapidDetails: {
      subject: 'mailto:katorenilesh@gmail.com',
      publicKey: vapidPublicKey,
      privateKey: vapidPrivateKey
    },
    TTL: 60
  };
app.get('/notify/all', function(req, res){

    webPush.sendNotification(
        pushSubscription,
        payload,
        options
      )
      .catch(function(err){
        console.log('Failed - ', err);
      })
      res.send('Hello World!');

})