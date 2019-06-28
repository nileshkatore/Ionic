import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  @ViewChild('player') playerElrRef: ElementRef;
  @ViewChild('canvas') canvasEleRef: ElementRef;
  @ViewChild('captureBtn') captureBtnEleRef: ElementRef;

  player: any;
  canvas: any;
  CaptureBnt: any;
  nav: any;
  mediaDeviceArray: any;

  constructor() {

  }

  ngAfterViewInit(){
    this.nav = navigator;
    this.canvas = this.canvasEleRef.nativeElement as HTMLElement;
    this.player = this.playerElrRef.nativeElement as HTMLElement;

    this.initializeMedia();
  }

  initializeMedia(){
    this.canvas.style.display = 'none';
    if(!(this.nav.mediaDevices)){
      this.nav.mediaDevices = {};
    }
    if(!(this.nav.mediaDevices.getUserMedia)){
      this.nav.mediaDevices.getUserMedia = (contraints) => {
        let userMedia = this.nav.webkitGetUserMedia || this.nav.mozGetUserMedia;
        if(!userMedia){
          return Promise.reject(new Error('getUserMedia is not implemented'));
        }
        return new Promise(function(resolve, reject){
          userMedia.call(this.nav, contraints, resolve, reject);
        });
      };
    }

    let that = this;
    this.nav.mediaDevices.getUserMedia({video: true})
    .then(function(stream){
      that.player.srcObject = stream;
    })
    .catch(function(err){
    })
  }

  captureImage(){
    this.canvas.style.dispaly = 'bolck';
    let context = this.canvas.getContext('2d');
    context.drawImage(this.player,0,0,this.player.width, this.player.height);
    this.player.display = 'none';

  }
}
