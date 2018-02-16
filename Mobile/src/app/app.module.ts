import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';

import { WelcomePage } from '../pages/welcome/welcome';
import { AjoutProfilPage } from '../pages/ajout-profil/ajout-profil';
import { LoginPage } from '../pages/login/login';
import { ListinvitationPage } from '../pages/listinvitation/listinvitation';
import { SignupPage } from '../pages/signup/signup';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {CreerPlanPage} from '../pages/creer-plan/creer-plan';
import {DetailinvitationPage} from '../pages/detailinvitation/detailinvitation';
import { CommenterPage } from '../pages/commenter/commenter';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { AdresseServiceProvider } from '../providers/adresse-service/adresse-service';
import { InteretServiceProvider } from '../providers/interet-service/interet-service';
import { PublicationServiceProvider } from '../providers/publication-service/publication-service';
import { GlobalServiceProvider } from '../providers/global-service/global-service';
import { CommentaireServiceProvider } from '../providers/commentaire-service/commentaire-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    WelcomePage,
    LoginPage,
    SignupPage,
    TabsPage,
    CreerPlanPage,
    ListinvitationPage,
    DetailinvitationPage,
    CommenterPage,
    AjoutProfilPage
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    WelcomePage,
    LoginPage,
    SignupPage,
    TabsPage,
    CreerPlanPage,
    ListinvitationPage,
    DetailinvitationPage,
    CommenterPage,
    AjoutProfilPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    AdresseServiceProvider,
    InteretServiceProvider,
    PublicationServiceProvider,
    PublicationServiceProvider,
    GlobalServiceProvider,
    CommentaireServiceProvider,
    Camera,
    Base64
  ]
})
export class AppModule {}
