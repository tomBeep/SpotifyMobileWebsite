import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataService} from "../../app/dataService";
import {Globals} from "../../app/globals";

@Component({
  selector: 'page-player',
  templateUrl: 'player.html'
})
export class PlayerPage {

  repeat: boolean;
  shuffle: boolean;
  playPause: boolean;//true if playing a song
  picture:any;
  songName:string;
  imageSrc:string;
  songArtists:string;

  constructor(public navCtrl: NavController, private data: DataService, public globals: Globals) {

  }

  ngOnInit(){
    this.updateCurrentlyPlaying();
  }

  nextSong() {
    this.data.nextSong().subscribe(success => {
      setTimeout(()=>this.updateCurrentlyPlaying(),500);
    });
  }

  previousSong() {
    this.data.previousSong().subscribe(success => {
      setTimeout(()=>this.updateCurrentlyPlaying(),500);
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

  newPlaylistSelected(playlistURI) {
    this.data.playCurrentSong(playlistURI).subscribe(event => {
      setTimeout(()=>this.updateCurrentlyPlaying(),500);
    });
    this.playPause = true;
  }

  updateCurrentlyPlaying() {
    this.data.getCurrentPlayingSong().subscribe(data => {
      try {
        this.playPause = data.is_playing;
        this.shuffle = data.shuffle_state;
        this.songName = data.item.name;
        this.imageSrc = data.item.album.images[0].url;
        //display a nice string of the artist's names
        let trackArtists = "";
        data.item.artists.forEach(artist => trackArtists = trackArtists.concat(artist.name + ", "));
        trackArtists = trackArtists.substring(0, trackArtists.length - 2);
        this.songArtists = trackArtists;
      } catch (err) {
        //do nothing.
      }
    });
  }
}
