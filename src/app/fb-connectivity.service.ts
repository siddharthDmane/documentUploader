import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FbConnectivityService {
  constructor() { 
  }
 
  user="unknown";

  setUser(user:string){
    this.user=user;
  }

  firebaseConfig = {
    apiKey: "AIzaSyDKOzrh8eqa-WWlVgH3FtB_f3PuewhY_jo",
    authDomain: "documentuploader-30c4d.firebaseapp.com",
    databaseURL: "https://documentuploader-30c4d-default-rtdb.firebaseio.com",
    projectId: "documentuploader-30c4d",
    storageBucket: "documentuploader-30c4d.appspot.com",
    messagingSenderId: "1018703806958",
    appId: "1:1018703806958:web:05263c35e2c9bc6cd94eff",
    measurementId: "G-W6XBY8XE25"
  };
  
  // Initialize Firebase

}
