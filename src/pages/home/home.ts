import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {DataService} from "../../app/dataService";
import {of} from "rxjs/observable/of";
import {SettingsPage} from "../settings/settings";
import {LoginPage} from "../login/login";
import {Globals} from "../../app/globals";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userData: any;

  constructor(public globals: Globals, public navCtrl: NavController, public data: DataService, private alertCtrl: AlertController) {

  }

  ngOnInit() {
    this.data.getUserInfo().subscribe(data => {
      this.userData = data;
      this.globals.name = this.userData.display_name;
      this.globals.premiumUser = this.userData.type == 'user' ? false : true;
      this.globals.userID = this.userData.id;
    });
  }

  moveToSettingsPage(): void {
    this.navCtrl.push(SettingsPage);
  }

  logout(): void {
    let alert = this.alertCtrl.create({
      title: 'Are you sure you want to logout',
      cssClass: 'logout',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Logout',
          handler: () => {
            this.navCtrl.push(LoginPage);
            this.data.logout();
          }
        }
      ]
    });
    alert.present();
  }

}
