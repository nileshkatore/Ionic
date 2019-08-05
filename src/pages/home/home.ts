import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TypeCheckCompiler } from '@angular/compiler/src/view_compiler/type_check_compiler';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pocs : any;
  filteredPocs: any;
  selectedPoc: any;
  isOffline: boolean;
  lastConnectivityTime: string = '';
  @ViewChild('installBtn', {read: ElementRef}) installBtnEleRef : ElementRef;
  installBtn: any;

  constructor(public navCtrl: NavController) {
    let that = this;
    this.selectedPoc = {description: "dummy"};
    fetch('http://localhost:8000/api/pocs')
    .then( res => {
      return res.json();
    })
    .then(jsonRes => {
      that.pocs = jsonRes;

      that.pocs.forEach(element => {
          element.isExpanded = false;
        }
      )
      that.filteredPocs = that.pocs;
    })

    function handleNetworkChange(event){
      that.setNetworkProperties();
    }

    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);
  }

  ionViewWillEnter(){
    this.installBtn = this.installBtnEleRef.nativeElement as HTMLButtonElement;
    this.installApp();

    this.setNetworkProperties();
  }

  setNetworkProperties(){
    if(navigator.onLine){
      this.isOffline = false;
      this.lastConnectivityTime = '';
    }
    else {
      this.isOffline = true;
      this.lastConnectivityTime = this.getCurrentDateAndTime();
    }
  }

  onInput(event){
    console.log(event);
    this.filteredPocs = this.filterItem(event.srcElement.value);
  }

  filterItem(searchTerm){
    if(searchTerm){
      return this.pocs.filter( item => {
        return item.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      })
    }
    else{
      return this.pocs;
    }
  }
  enablePushNotification(){
    let that = this;
    let applicationServerKey = 'BM_mkHE35CTJ3u0wfii0AZOBh1qZH6srq8qe73X3YkphTShGGlT1cPF2kD0G9aTcoW0EaZ5-Y1UH_jNOAj35cy4'
    navigator.serviceWorker.ready
    .then(function(swReg){
      swReg.pushManager.getSubscription()
      .then(function(sub){
        console.log('sub - ',JSON.stringify(sub) );
          if(sub === null){
              swReg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: that.urlBase64ToUint8Array(applicationServerKey)
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

  getCurrentDateAndTime(){
    let currentDate = new Date();
    return currentDate.toDateString() + " " + currentDate.getHours() + ":" 
    + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  }

  installApp(){
    let that = this;
    let defferedPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      defferedPrompt = e;
      this.installBtn.style.display = 'block';
    })

    this.installBtn.addEventListener('click', (e) => {
      that.installBtn.style.display = 'none';
      defferedPrompt.prompt();
      defferedPrompt.userChoice
        .then((choiceResult) => {
          if(choiceResult.outcome === 'accepted'){
            console.log('User enabled push notifications');
          } 
          else {
            console.log('User dismissed push notifications');
          }
          defferedPrompt = null;
        });
    });
  }

  expandPoc(event){
    let that = this;
    let poc_id = event.currentTarget.id;
    this.filteredPocs.forEach((poc, index) => {
      if(poc.id === poc_id) {
        if(poc.isExpanded){
          poc.isExpanded = false;
        }
        else {
          poc.isExpanded = true;
          fetch('http://localhost:8000/api/pocs/' + poc_id)
          .then(response => {
            return response.json();
          })
          .then(jsonResonse => {
            console.log("json response " + jsonResonse);
            that.selectedPoc = jsonResonse;
          })
        }
      }
      else {
        poc.isExpanded = false;
      }
      that.filteredPocs[index] = poc;
    })
  }

  urlBase64ToUint8Array(base64String) {
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
}




// {
//   "subject": "mailto:<someone@example.com>",
//   "publicKey": "BM_mkHE35CTJ3u0wfii0AZOBh1qZH6srq8qe73X3YkphTShGGlT1cPF2kD0G9aTcoW0EaZ5-Y1UH_jNOAj35cy4",
//   "privateKey": "RowyecF3E-SGVck5rBUdzyzNP9gKTARX_fMLJ4ZixLQ"
// }


//{"endpoint":"https://fcm.googleapis.com/fcm/send/dqqxyW991Wg:APA91bGxFA0xmbhDCGoBxWTjHbbnXFsekKa8RcmJOsQf1kID1_hwgdhnfSUwAMl3tCtWD2CORHAxTtuBLwkEM6xHLxE2ChT0fTE9xkaQZjTsXL2kW0VyhBXVVD0mSAHMCg8ImhgE76Cu","expirationTime":null,"keys":{"p256dh":"BPcidQ8IXLhNa_CqKh-o9CjEbH10UxhiB098ZNqL_UO_0bWALB96YtPhHkPh0xbO2pdxGLCAK6PcejEiLgHBmcU","auth":"9b7Y6J3LFO0HylEuf3sWCA"}}