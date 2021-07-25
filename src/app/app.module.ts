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
//firebase
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { environment } from '../environments/environment'
//service
import { FirebaseService } from './service/firebase.service'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegistroVacunaComponent,
    RegistroComponent,
    RegistroFormComponent
  ],
  imports: [
    BrowserModule,
    //firebase
    //AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    //
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
