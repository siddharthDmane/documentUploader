import { Component } from '@angular/core';
import {initializeApp} from '../../../node_modules/firebase/app';
import {FbConnectivityService} from '../fb-connectivity.service';
import { getAuth,createUserWithEmailAndPassword } from "../../../node_modules/firebase/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent {
  constructor(private fb:FbConnectivityService,private router:Router){
  }

  app = initializeApp(this.fb.firebaseConfig);
  email:any;
  pass:any;
  user:any;
  auth=getAuth(this.app);

  signUp(){
    createUserWithEmailAndPassword(this.auth, this.email, this.pass)
      .then((userCredential:any) => {
        // Signed in 
        const user = userCredential.user;
        this.user=this.email;
        alert('Registered Succesfully ...');
        this.fb.setUser(this.email);
        this.router.navigate(['/login']);
        // ...
      })
      .catch((error:any) => {
        
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode=='auth/email-already-in-use'){
          this.router.navigate(['/login']);
        }
        alert(error.code);
        this.fb.setUser(this.email);
        // ..
      });
  }

  setEmail(uemail:any){
    this.email=uemail.value;
    console.log(this.email);
  }

  setPass(upass:any){
    this.pass=upass.value;
    console.log(this.pass);
  }
}
