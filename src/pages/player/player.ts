import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataService} from "../../app/dataService";

@Component({
  selector: 'page-player',
  templateUrl: 'player.html'
})
export class PlayerPage {

  repeat: boolean;
  shuffle: boolean;
  playPause: boolean;

  constructor(public navCtrl: NavController, private data: DataService) {

  }

  nextSong() {
    this.data.nextSong().subscribe(success => {
    });
  }

  previousSong() {
    this.data.previousSong().subscribe(success => {
    });
  }

  playPauseToggle() {
    //could definitly be improved, few bugs with concurrent spotify apps playing
    this.playPause = !this.playPause;
    if (this.playPause == true) {
      this.data.playCurrentSong().subscribe(event => {
      });
    } else {
      this.data.pause().subscribe(event => {
      });
    }
  }

  shuffleToggle() {
    this.shuffle = !this.shuffle;
    this.data.toggleShuffle(this.shuffle).subscribe(null);
  }

  repeatToggle() {
    this.repeat = !this.repeat;
    let newState: string = this.repeat ? 'track' : 'off';
    this.data.toggleRepeat(newState).subscribe(success => {
    });
  }
}
