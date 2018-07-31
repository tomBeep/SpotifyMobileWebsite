import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DataService} from "../../app/dataService";
import {Globals} from "../../app/globals";

/**
 * Generated class for the DuplicateFinderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-duplicate-finder',
  templateUrl: 'duplicate-finder.html',
})
export class DuplicateFinderPage {

  stage: number = 1;
  allTracks: any [];
  finishedLoadingSongs: boolean = false;
  playlistID: string;
  duplicates: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private data: DataService, public globals: Globals) {
  }

  printNice(artists) {
    return Globals.printArtistsNice(artists);
  }


  loadTracks(playlist: string) {
    //doesn't matter if playlist string is full spotify id or not
    let segments: string[] = playlist.split(":");
    this.playlistID = segments[segments.length - 1];

    this.duplicates = null;
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

  findDuplicateRemasteredSongs() {
    let uniqueTracks: any[] = [];
    this.duplicates = [];
    this.allTracks.forEach((track) => {
      if (track.track != null) {
        let isRemastered: boolean = false;
        let currentTrackname: string = track.track.name;
        //check if the word remastered or remaster is in the track name.
        if (currentTrackname.includes("Remaster")) {
          isRemastered = true;
          //every remastered song has a dash as part of it's name.
          let dashIndex = currentTrackname.indexOf(" - ");
          if (dashIndex != -1) {
            currentTrackname = currentTrackname.substring(0, dashIndex);
            track.track.name = currentTrackname;
          }
        }
        let currentTrackArtistIDs = [];
        //populate the current track artists.
        track.track.artists.forEach(artist => currentTrackArtistIDs.push(artist.id));
        //go through each past unique track comparing it.
        for (let i = 0; i < uniqueTracks.length; i++) {
          let pastTrack = uniqueTracks[i];
          let match: boolean = true;
          //check if all the artists are the same.
          pastTrack.artists.forEach(artist => {
            if (match && !currentTrackArtistIDs.includes(artist.id)) {
              match = false;//if they arent, then move on.
            }
          });
          //if artists are the same, check if name is the same.
          if (match && pastTrack.name == currentTrackname) {
            //if the name is the same, push the track to the duplicates list and stop.
            this.duplicates.push(track);
            break;
          }
          //if the name is not the same, move on
        }
        //if all past songs were not matched, then this song is unique.
        uniqueTracks.push(track.track);
      }
    });
  }
}
