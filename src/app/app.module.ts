import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { UploadComponent } from './upload/upload.component';
import { ViewComponent } from './view/view.component';
import { Routes,RouterModule } from '@angular/router';
import { GetKeysPipe } from './get-keys.pipe';
import { FbConnectivityService } from './fb-connectivity.service';

const routes:Routes=[
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterationComponent},
  {path:"upload",component:UploadComponent},
  {path:"view",component:ViewComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterationComponent,
    UploadComponent,
    ViewComponent,
    GetKeysPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [FbConnectivityService,CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
