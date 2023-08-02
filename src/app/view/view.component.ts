import { Component } from '@angular/core';
import {initializeApp} from '../../../node_modules/firebase/app';
import {getDatabase, ref, onValue} from "../../../node_modules/firebase/database";
import {FbConnectivityService} from '../fb-connectivity.service';
import { AppComponent } from '../app.component';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {

  username="";
  userlink="";
  active=true;

  constructor(private fb:FbConnectivityService,private cookie:CookieService){
    this.counter=0;
    this.username=cookie.get('username');
    if(this.username==""){
      alert('please log in to your account');
    }
    else{
      let ind=this.username.indexOf('@');
      this.username=this.username.slice(0,ind);
      this.userlink='Documents/'+this.username;
      alert('hey '+this.username+', you can view your uploaded documents here !');
      this.active=false;
    }
  }

  ngOnInit(){
    console.log(this.username);
  }

  userid:any;
  sample="sample";
  files:Object={};
  docIds:any=[];
  docNames:any=[];
  docUrls:any=[];
  counter:number;

 

  m(){
      alert('hi');
  };

  get(){
    let app = initializeApp(this.fb.firebaseConfig);
    //const analytics = getAnalytics(app);  
    let database = getDatabase(app);
    let link=ref(database,this.userlink);
    onValue(link,(snapshot: any)=>{
      console.log(Object.keys(snapshot.val()).length);
      console.log(Object.keys(snapshot.val()));
      console.log(snapshot.val());
      this.files=snapshot.val();
      let k=Object.keys(snapshot.val());
    for(let i=0;i<Object.keys(snapshot.val()).length;i++){
      var index=k[i];
      var data=snapshot.val();
      this.docIds.push(this.counter);
      this.docNames.push(data[index].docName);
      this.docUrls.push(data[index].docUrl);
      console.log(data[index].docUrl);  
      this.counter+=1;
    }  
    console.log(this.docNames);
    console.log(this.docUrls);
    });
 }

 getFiles(){
  console.log(this.files);
 }

}
