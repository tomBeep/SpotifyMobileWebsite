import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { PlayerPage } from '../pages/player/player';
import { EditorPage } from '../pages/editor/editor';
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
import {DuplicateFinderPage} from "../pages/duplicate-finder/duplicate-finder";

@NgModule({
  declarations: [
    MyApp,
    PlayerPage,
    EditorPage,
    HomePage,
    TabsPage,
    LoginPage,
    SelectPlaylistPage,
    SettingsPage,
    DuplicateFinderPage,
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
    EditorPage,
    HomePage,
    TabsPage,
    LoginPage,
    SettingsPage,
    DuplicateFinderPage,
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
