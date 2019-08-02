let express = require('express');
let webPush = require('web-push');

let app = express();
let port = 8000
app.listen(8000,function() {
    console.log('Node server started started at port ' + port);
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

app.get('/api/pocs', function(req, res){
  constructResponse(200, pocs, res)
})

app.get('/api/pocs/:pocId', (req, res) => {
  var poc_id = req.params.pocId;
  var poc = pocDetalis.find(poc => {
    return poc.id === poc_id;
  })
  constructResponse(200, poc, res)
})

function constructResponse(status, data, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.status(status).send(data);
}

var pocs = [ 
  {
    id : 'micorservices-poc-01',
    title : 'Microservces Journey',
  },
  {
    id : 'pwa-poc-01',
    title : 'PWA Journey',
  },
  {
    id : 'kafka-poc-01',
    title : 'Kafka Journey',
  }
]

var pocDetalis = [ 
  {
    id : 'micorservices-poc-01',
    title : 'Microservces Journey',
    description : 'microservices desc',
    clientName : 'ABN AMRO',
    technologies : [
      'Docker',
      'Kubernetes'
    ]
  },
  {
    id : 'pwa-poc-01',
    title : 'PWA Journey',
    description : 'PWA desc',
    clientName : 'ABN AMRO',
    technologies : [
      'Service Worker',
      'App Menifest',
      'JS',
      'HTML 5'
    ]
  },
  {
    id : 'kafka-poc-01',
    title : 'Kafka Journey',
    description : 'kafka desc',
    clientName : 'ABN AMRO',
    technologies : [
      'Kafka',
    ]
  }
]