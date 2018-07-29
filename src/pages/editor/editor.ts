import {Component} from '@angular/core';
import {ActionSheetController, AlertController, NavController} from 'ionic-angular';
import {DataService} from "../../app/dataService";

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
              private actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController) {

  }

  loadTracks(playlist: string) {
    //doesn't matter if playlist is full spotify id or not
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

  openOptions(track) {
    console.log("HEY " + track);

    const actionSheet = this.actionSheetCtrl.create({
      cssClass: 'alertCustomCss',
      buttons: [
        {
          text: 'Delete from Playlist',
          handler: () => {
            this.data.deleteSongsFromPlayList(this.playlistID, ['spotify:track:' + track]).subscribe(
              success => console.log("success"), err => this.showAlert(err.error.error.message, true)
            );
          }
        }
      ]
    });
    actionSheet.present();
  }

  showAlert(message: string, isError: boolean) {
    let title: string = isError ? "ERROR" : "Success";
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK'],
      cssClass: 'alertCustomCss'
    });
    alert.present();
  }
}
