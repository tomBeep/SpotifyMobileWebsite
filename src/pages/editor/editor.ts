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
    let trackArtists = "";
    track.track.artists.forEach(artist => trackArtists = trackArtists.concat(artist.name + ", "));
    trackArtists = trackArtists.substring(0, trackArtists.length - 2);
    let message =
      "<p>Track Name: <strong>" + track.track.name + "</strong></p>" +
      "<p>Release Date: <strong>" + this.formatDate(new Date(track.track.album.release_date)) + "</strong></p>" +
      "<p>Date Added to playlist: <strong>" + this.formatDate(new Date(track.added_at)) + "</strong></p>" +
      "<p>Track Duration: <strong>" + this.convertMillis(track.track.duration_ms) + "</strong></p>" +
      "<p>Track Artists: <strong>" + trackArtists + "</strong></p>" +
      "<p>Album Name: <strong>" + track.track.album.name + "</strong></p>" +
      "<p>Track ID: <strong>" + track.track.id + "</strong></p>"
    ;
    let title = track.track.name;
    this.showAlert(message, title);
  }

  formatDate(date): string {
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

