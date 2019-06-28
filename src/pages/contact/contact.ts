import { Component } from '@angular/core';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  feedback: string;
  isOffline: boolean;
  lastConnectivityTime: string = '';

  constructor() {
    let that = this;
    function handleNetworkChanges(event){
      console.log("network changed...");
      if(navigator.onLine){
        that.isOffline = false;
        that.lastConnectivityTime = '';
      }
      else {
        that.isOffline = true;
        that.lastConnectivityTime = new Date().toDateString();
      }
    }
    window.addEventListener("online", handleNetworkChanges);
    window.addEventListener("offline", handleNetworkChanges);
  }

  ionViewWillEnter(){
    if(navigator.onLine){
      this.isOffline = false;
    }
    else {
      this.isOffline = true;
      this.lastConnectivityTime = new Date().toDateString();
    }
  }

  sendFeedback(){
    if('serviceWorker' in navigator && 'SyncManager' in window) {
      Notification.requestPermission(function(result){
        if(result === 'granted'){
          navigator.serviceWorker.ready.then(function(registration){});
        }
      });
      navigator.serviceWorker.ready
      .then((sw) => {
        sw.sync.register('sync-feedback');
        console.log("[Application] : Register Sync event locally...");
      });
    }
  }
}
