import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Globals} from "../../app/globals";

/**
 * Generated class for the FullSongInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-full-song-info',
  templateUrl: 'full-song-info.html',
})
export class FullSongInfoPage {

  track: any;

  constructor(public navCtrl: NavController, public navParams:NavParams, private globals: Globals) {
    this.track = this.navParams.get("song");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FullSongInfoPage');
  }

  printArtists() {
    return Globals.printArtistsNice(this.track.track.artists);
  }

  formatDate(millisec): string {
    let date = new Date(millisec);
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  convertMillis(millis): string {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + seconds;
  }

}
