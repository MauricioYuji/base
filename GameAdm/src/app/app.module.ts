
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TesteComponent } from './pages/teste/teste.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ListComponent } from './pages/list/list.component';
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
import { DetailsUploadComponent } from './pages/details-upload/details-upload.component';
import { FormUploadComponent } from './pages/form-upload/form-upload.component';
import { ListUploadComponent } from './pages/list-upload/list-upload.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    TesteComponent,
    ListComponent,
    CardComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    NgbdModalBasic,
    DetailsUploadComponent,
    FormUploadComponent,
    ListUploadComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'Teste'),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    NgbModule,
    ImageCropperModule
  ],
  providers: [
    gamesService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
