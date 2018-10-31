
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TesteComponent } from './pages/teste/teste.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { NgbdModalBasic } from './components/modal/modal.component';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { gamesService } from './services/gamesService';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TesteComponent,
    CardComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    NgbdModalBasic
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'Teste'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgbModule
  ],
  providers: [
    gamesService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
