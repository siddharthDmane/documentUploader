import { Component ,Output,EventEmitter} from '@angular/core';
import {initializeApp} from '../../../node_modules/firebase/app';
import {FbConnectivityService} from '../fb-connectivity.service';
import { getAuth,signInWithEmailAndPassword} from "../../../node_modules/firebase/auth";
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //fb=new FbConnectivityService();
  
  constructor(private fb:FbConnectivityService, private cookieService: CookieService,private router:Router){
  }

  app = initializeApp(this.fb.firebaseConfig);
  email:any;
  pass:any;
  @Output() userid=new EventEmitter<any>();
  user:any;
  auth=getAuth(this.app);

  sendId(){
    this.userid.emit(this.email);
  }

  authenticate(){
    signInWithEmailAndPassword(this.auth, this.email, this.pass)
    .then((userCredential:any) => {
      // Signed in 
      const user = userCredential.user;
      alert("LoggedIn succesfully ...");
      this.user=this.email;
      this.cookieService.set('username', this.email );
      this.router.navigate(['/view']);
    })
    .catch((error:any) => {
      alert(error.message);
      const errorCode = error.code;
      const errorMessage = error.message;
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
