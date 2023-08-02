import { Component} from '@angular/core';
import { FbConnectivityService } from './fb-connectivity.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../../node_modules/bootstrap/dist/css/bootstrap.min.css','./app.component.css']
})
export class AppComponent {
  constructor( private cookieService: CookieService){
  }
 
  title = 'documentUploader';
  homeactive=true;
  loginactive=false;
  registeractive=false;
  uploadactive=false;
  viewactive=false;
  aboutactive=false;
  uemail:any;

  setUser(){
    this.uemail=this.cookieService.get('username');
    alert(this.uemail);
    console.log(this.uemail);

  }


  setActive(e:any){
    let cname=e.innerHTML;
    if(cname=='Home'){
      this.homeactive=true;
      this.loginactive=false, this.registeractive=false, this.uploadactive=false, this.viewactive=false, this.aboutactive=false;
    }
    else if(cname=='LogIn'){
      this.homeactive=false;
      this.loginactive=true, this.registeractive=false, this.uploadactive=false, this.viewactive=false, this.aboutactive=false;
    }
    else  if(cname=='Register'){
      this.homeactive=false;
      this.loginactive=false, this.registeractive=true, this.uploadactive=false, this.viewactive=false, this.aboutactive=false;
    }
    else if(cname=='Upload Files'){
      this.homeactive=false;
      this.loginactive=false, this.registeractive=false, this.uploadactive=true, this.viewactive=false, this.aboutactive=false;
    }
    else if(cname=='View Files'){
      this.homeactive=false;
      this.loginactive=false, this.registeractive=false, this.uploadactive=false, this.viewactive=true, this.aboutactive=false;
    }
    else if(cname=='About'){
      this.homeactive=false;
      this.loginactive=false, this.registeractive=false, this.uploadactive=false, this.viewactive=false, this.aboutactive=true;
    }                    
  }
}
