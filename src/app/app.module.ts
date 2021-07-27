import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { RegistroVacunaComponent } from './registro-vacuna/registro-vacuna.component';
import { RegistroComponent } from './registro/registro.component';
import { RegistroFormComponent } from './registro-form/registro-form.component';
import { FormsModule } from '@angular/forms';
//firebase
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { environment } from '../environments/environment'
import { AngularFireModule } from '@angular/fire'
//service
import { FirebaseService } from './service/firebase.service';
import { Alert2DosisComponent } from './alert2-dosis/alert2-dosis.component';
import { InfoRegistroComponent } from './info-registro/info-registro.component';
import { NoUserComponent } from './no-user/no-user.component';
import { ConfirmRegistroComponent } from './confirm-registro/confirm-registro.component'
import { LocationStrategy, HashLocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegistroVacunaComponent,
    RegistroComponent,
    RegistroFormComponent,
    Alert2DosisComponent,
    InfoRegistroComponent,
    NoUserComponent,
    ConfirmRegistroComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    //firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    //
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    FirebaseService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
