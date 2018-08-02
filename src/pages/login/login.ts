import {Component} from '@angular/core';
import {AlertController, NavController, Platform} from 'ionic-angular';
import {Globals} from "../../app/globals";
import {DataService} from "../../app/dataService";
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  authFailed: boolean;
  showLoadingCursor: boolean;

  constructor(public data: DataService, private plt: Platform, public navCtrl: NavController, public alertCtrl: AlertController, public globals: Globals) {

  }

  ionViewDidLoad() {
    //this is web specific code for logging into spotifies API.
    //when login function is called,
    // browser navigates to spotify's login page, then navigates back to this page on success with a bunch of params
    if (document.URL != null) {//is null if on mobile...
      let params: string[] = document.URL.split(/([{=&}]+)/);
      if (params[2] != null) {
        if (params[2] === "access_denied") {//happens if user denies app the right to access spotify.
          console.log("login failed!");
          this.authFailed = true;
        } else {
          this.data.token = params[2];
          window.history.pushState("object or string", "Title", "/");//remove pesky URL
          this.navCtrl.push(TabsPage);//navigate to home page
        }
      } else {
        console.log("Haven't attempted login");
      }
    }
    this.showLoadingCursor = false;
  }

  login(): void {
    this.showLoadingCursor = true;
    if (this.plt.is('core')) {
      this.data.loginToSpotifyDesktop();
    } else {
      this.loginWithMobile();
    }
  }

  private loginWithMobile(): void {
    let obj = this.data.loginToSpotifyMobile();
    obj.observable.subscribe(data => {
      var url = data.url;
      console.log("URL is: " + url);
      if (url.startsWith("http://tspe-app://callback")) {
        obj.browser.close();
        let params: string[] = url.split(/([{=&}]+)/);
        if (params[2] != null) {
          if (params[2] === "access_denied") {//happens if user denies app the right to access spotify.
          } else {
            this.data.token = params[2];
            this.navCtrl.push(TabsPage);//navigate to home page
          }
        }
      }
    });
  }


}
