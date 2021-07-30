import { Component , OnInit , ViewChild} from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { ResumeService } from '../resume.service';

let mySrc = 1;

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})


export class SampleComponent implements OnInit{


  private stream?: MediaStream;
  private recordRTC: any;
 
   private record :  any;
   recording = false;
   private videorecording = false;
   private url : any;
   
   private error : any;
   dataurl : any;


   constructor(private domSanitizer: DomSanitizer,private http: HttpClient,private resumeService?: ResumeService) {
   }
   sanitize(dataurl:string){
       return this.domSanitizer.bypassSecurityTrustUrl(dataurl);
   }
  
   
   initiateRecording() {
       
       this.dataurl="";
       this.recording = true;
       
       let mediaConstraints = {
        video: false,
        audio: true
    };
    navigator.mediaDevices
                .getUserMedia(mediaConstraints)
                .then(this.successCallback.bind(this), this.errorCallback.bind(this));

   }


   successCallback(stream : any) {
       var options = {
           mimeType: "audio/wav",
           numberOfAudioChannels: 1
       };
       
       var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
       this.record = new StereoAudioRecorder(stream, options);
       this.record.record();
   }

  
   stopRecording() {
       this.recording = false;
       this.record.stop(this.processRecording.bind(this));
       
   }
   /**
    * processRecording Do what ever you want with blob
    * @param  {any} blob Blog
    */
   
   processRecording(blob : any) {
       this.url = URL.createObjectURL(blob);
       console.log(blob);
       console.log(this.url);
       blobToBase64(blob).then(res => {
            
        this.dataurl = res;  
        let b64 = this.dataurl.replace(/^data:.+;base64,/, '');
        // this.http.post('http://localhost:8080/form/audio', {base64string: b64}).subscribe((res)=>{
            // console.log(res)
            
          // });

          this.resumeService?.getaudio(b64)
          .subscribe(
            response => {
              console.log(response);
             
            },
            error => {
              console.log(error);
            });
           
      
         
      });
      
   }


   

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



const blobToBase64 = (blob :  any) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };








