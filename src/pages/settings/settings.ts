import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';

@Component({
  selector: 'settings-playlist',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  volume: number = 50;
  streamingQuality: number = 64;
  offlineMode = false;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

  }

  ngOnInit() {
    console.log("inited");
  }

  back() {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    }
  }

  backAndSave() {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    }
    console.log("volume: " + this.volume);
    console.log("streamingQuality: " + this.streamingQuality);
    console.log("offline mode: " + this.offlineMode);
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'About this App',
      subTitle: 'Made by Thomas Edwards',
      message: '<p>Version: 1.0</p>' +
      '<p>Date: 29/07/2018</p>' +
      '<p>Developed By: Thomas</p>' +
      '<p>Styled By: Thomas</p>' +
      '<p>For more information about Spotify see their website</p>' +
      '<p>All images are taken with copyright permission from Spotify\'s website</p>',
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
