import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { PlayerPage } from '../pages/player/player';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Globals} from "./globals";
import {LoginPage} from "../pages/login/login";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {DataService} from "./dataService";
import {SelectPlaylistPage} from "../pages/select-playlist/select-playlist";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {SettingsPage} from "../pages/settings/settings";

@NgModule({
  declarations: [
    MyApp,
    PlayerPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SelectPlaylistPage,
    SettingsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PlayerPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SettingsPage,
  ],
  providers: [
    Globals,
    StatusBar,
    SplashScreen,
    InAppBrowser,
    DataService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
