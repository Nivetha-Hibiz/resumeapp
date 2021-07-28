import { Component , OnInit} from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
let mySrc = 1;
@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit{

  //Lets initiate Record OBJ
   record : any;
   //Will use this flag for detect recording
   recording = false;
   //Url of Blob
    url : any;
   error :  any;
   constructor(private domSanitizer: DomSanitizer) {
   }
   sanitize(url:string){
       return this.domSanitizer.bypassSecurityTrustUrl(url);
   }
   /**
    * Start recording.
    */
   initiateRecording() {
       
       this.url="";
       this.recording = true;
       
       let mediaConstraints = {
        video: false,
        audio: true
    };
 navigator.mediaDevices
 .getUserMedia(mediaConstraints)
 .then(this.successCallback.bind(this), this.errorCallback.bind(this));
      
   }
   /**
    * Will be called automatically.
    */
   successCallback(stream :  any) {
       var options = {
           mimeType: "audio/wav",
           numberOfAudioChannels: 1
       };
       //Start Actuall Recording
       var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
       this.record = new StereoAudioRecorder(stream, options);
       this.record.record();
   }
   /**
    * Stop recording.
    */
   stopRecording() {
       this.recording = false;
       this.record.stop(this.processRecording.bind(this));
   }
   /**
    * processRecording Do what ever you want with blob
    * @param  {any} blob Blog
    */
   processRecording(blobb : any) {
       this.url = URL.createObjectURL(blobb);
       console.log(blobb);
       console.log(this.url);
       //var blobb = dataURLtoBlob('data:text/plain;base64,YWFhYWFhYQ==');
       var a         = document.createElement('a');
       a.href        = this.url; 
       a.target      = 'D:/hibiz';
       a.download    = 'A' + mySrc + '.mp3';
       // this.sectiontime();
       document.body.appendChild(a);
       a.click();
       mySrc = mySrc + 1;
       
   }
   /**
    * Process Error.
    */
   errorCallback(error : any) {
       this.error = 'Can not play audio in your browser';
   }


   ngOnInit() {
     let mediaConstraints = {
           video: false,
           audio: true
       };
    navigator.mediaDevices
    .getUserMedia(mediaConstraints)
    .then();

   }
}

