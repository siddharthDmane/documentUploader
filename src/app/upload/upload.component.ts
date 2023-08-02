import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { initializeApp } from "../../../node_modules/firebase/app";
import { getStorage,ref, uploadBytesResumable,getDownloadURL } from "../../../node_modules/firebase/storage";
import {FbConnectivityService} from '../fb-connectivity.service';
import { getDatabase,set,ref as rtd } from "../../../node_modules/firebase/database";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  username:string="";
  active=true;
  userlink:string="";
  filename:string="";
  filedata:any;
  progress="0px";
  speed={'height':'15px','width':'100%','background-color': 'blue'};

  constructor(private cookie:CookieService,private fb:FbConnectivityService,){
    this.username=cookie.get('username');
      if(this.username==""){
        alert('please log in to your account');
      }
      else{
        //let ind=this.username.indexOf('@');
        //this.username=this.username.slice(0,ind);
        this.userlink='Documents/'+this.username;
        alert('hey '+this.username+', you can uploade your documents here !');
        this.active=false;
      }
  }
  
  getDetails(e:any){
    this.filedata=e.target.files[0];
    this.filename=this.filedata.name;
    if(this.filedata==undefined){
      alert('File not uploaded');
    }
    else{
      console.log(this.filename);
      console.log(this.filedata);
    }
  }

  uploadFile(){
		if(this.filedata==undefined){
			alert("error");
		}
    else{
      let url='Documents/'+this.username+'/'+this.filename;

      let app = initializeApp(this.fb.firebaseConfig);     
      let storage = getStorage(app);
      let link=ref(storage,url); 
      console.log(link);
      const uploadTask =uploadBytesResumable(link,this.filedata);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          this.progress=progress+'%';
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          alert('Uploading error !');
          switch (error.code) {
            case 'storage/unauthorized':
              console.log('User doesnt have permission to access the object');
              break;
            case 'storage/canceled':
              console.log('User canceled the upload');
              break;      
            case 'storage/unknown':
              console.log('Unknown error occurred, inspect error.serverResponse');
              break;
          }
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            let ind=this.username.indexOf('@');
            let un=this.username.slice(0,ind);
            let fn=this.filename.slice(0,this.filename.indexOf('.'));
            let url='Documents/'+un+'/'+fn;

            const db = getDatabase(app);
              set(rtd(db,url), {
                docName:this.filename,
                docUrl:downloadURL
              });

          });
        }
      );

    }
  }
  

}
