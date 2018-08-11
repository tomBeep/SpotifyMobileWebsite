import {Component} from '@angular/core';
import {ActionSheetController, AlertController, NavController} from 'ionic-angular';
import {DataService} from "../../app/dataService";
import {Globals} from "../../app/globals";
import {FullSongInfoPage} from "../full-song-info/full-song-info";

@Component({
  selector: 'editor',
  templateUrl: 'editor.html'
})
export class EditorPage {

  stage: number = 1;
  allTracks: any [];
  finishedLoadingSongs: boolean = false;
  playlistID: string;

  constructor(public navCtrl: NavController, private data: DataService,
              private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController, private globals: Globals) {

  }

  loadTracks(playlist: string) {
    //doesn't matter if playlist string is full spotify id or not
    let segments: string[] = playlist.split(":");
    this.playlistID = segments[segments.length - 1];

    this.stage = 2;
    this.finishedLoadingSongs = false;
    this.allTracks = [];
    this.data.getPlaylist(this.playlistID).subscribe(data => {
      data.tracks.items.forEach(item => this.allTracks.push(item));
      this.loadExtraTracks(data.tracks.next);
    });
  }

  playSong(index) {
    this.globals.playSong = this.allTracks[index].track.uri;
    console.log(this.globals.playSong);
    this.navCtrl.parent.select(1);
  }

  private loadExtraTracks(nextURL): void {
    if (nextURL != null) {
      this.data.getAllTracks(nextURL).subscribe(nextData => {
        nextURL = nextData.next;
        nextData.items.forEach(item => this.allTracks.push(item));
        this.loadExtraTracks(nextURL);//recursivley continues to load songs.
      });
    } else {
      this.finishedLoadingSongs = true;
    }
  }

  openOptions(track, index) {
    const actionSheet = this.actionSheetCtrl.create({
      cssClass: 'alertCustomCss2',
      buttons: [
        {
          text: 'Play song',
          handler: () => {
            this.playSong(index);
          }
        },
        {
          text: 'View All Song Info',
          handler: () => {
            this.displayFullSongInfo(index);
          }
        }, {
          text: 'Delete from Playlist',
          handler: () => {
            this.data.deleteSongsFromPlayList(this.playlistID, ['spotify:track:' + track]).subscribe(
              success => {
                this.showAlert("Track Deleted", "Success");
                this.loadTracks(this.playlistID);//reload the playlist
              }, err => this.showAlert(err.error.error.message, "ERROR")
            );
          }
        },
      ]
    });
    actionSheet.present();
  }

  showAlert(message: string, title: string) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK'],
      cssClass: 'alertCustomCss'
    });
    alert.present();
  }

  displayFullSongInfo(index) {
    let track = this.allTracks[index];
    this.navCtrl.push(FullSongInfoPage, {song: track});
  }


}

