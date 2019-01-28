import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  enablePushNotification(){
    let applicationServerKey = 'BM_mkHE35CTJ3u0wfii0AZOBh1qZH6srq8qe73X3YkphTShGGlT1cPF2kD0G9aTcoW0EaZ5-Y1UH_jNOAj35cy4'
    navigator.serviceWorker.ready
    .then(function(swReg){
      swReg.pushManager.getSubscription()
      .then(function(sub){
        console.log('sub - ',JSON.stringify(sub) );
          if(sub === null){
              swReg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(applicationServerKey)
            })
            .then(function(subscription){
              console.log('subscription - ', JSON.stringify(subscription) );
              return subscription;
            })
          }
          else{
            return sub;
          }
      })
    })
    .then(function(sub){
      console.log('sub - ', sub);
    })
    .catch(function(err){
      console.log('Error -- ', err);
    });
  }


}

function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


// {
//   "subject": "mailto:<someone@example.com>",
//   "publicKey": "BM_mkHE35CTJ3u0wfii0AZOBh1qZH6srq8qe73X3YkphTShGGlT1cPF2kD0G9aTcoW0EaZ5-Y1UH_jNOAj35cy4",
//   "privateKey": "RowyecF3E-SGVck5rBUdzyzNP9gKTARX_fMLJ4ZixLQ"
// }


//{"endpoint":"https://fcm.googleapis.com/fcm/send/dqqxyW991Wg:APA91bGxFA0xmbhDCGoBxWTjHbbnXFsekKa8RcmJOsQf1kID1_hwgdhnfSUwAMl3tCtWD2CORHAxTtuBLwkEM6xHLxE2ChT0fTE9xkaQZjTsXL2kW0VyhBXVVD0mSAHMCg8ImhgE76Cu","expirationTime":null,"keys":{"p256dh":"BPcidQ8IXLhNa_CqKh-o9CjEbH10UxhiB098ZNqL_UO_0bWALB96YtPhHkPh0xbO2pdxGLCAK6PcejEiLgHBmcU","auth":"9b7Y6J3LFO0HylEuf3sWCA"}}