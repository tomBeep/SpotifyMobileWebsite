import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DataService} from "../../app/dataService";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";

@Component({
  selector: 'page-select-playlist',
  templateUrl: 'select-playlist.html'
})
export class SelectPlaylistPage {

  $UsersPlaylists: Observable<any>;
  selectedPlaylist : any;

  constructor(public navCtrl: NavController, private data: DataService) {

  }

  ngOnInit() {
    //get a list of the users playlists
    this.data.getUsersPlaylists().subscribe(data => this.$UsersPlaylists = of(data));
  }
}
