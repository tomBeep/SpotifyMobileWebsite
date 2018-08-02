import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Globals} from "./globals";


@Injectable()
export class DataService {

  token: string;
  private url: string = "https://api.spotify.com";
  private headers: HttpHeaders;//this header contains the Spotify token if logged in.
  private show_dialog: boolean;

  constructor(private http: HttpClient, private globals: Globals) {

  }

  loginToSpotify(): void {
    let publicKey: string = '75ac4d84a5dd44e8bf22810fdbe366a1';
    let callbackURL: string = "http://localhost:8100";
    let url: string = `https://accounts.spotify.com/authorize?client_id=${publicKey}&response_type=token&scope=streaming+user-read-playback-state+user-modify-playback-state+playlist-modify-private+playlist-modify-public&show_dialog=${this.show_dialog}&redirect_uri=${callbackURL}`;
    window.location.href = url;
    this.show_dialog = false;
  }

  //no way to logout but one can force dialog to be shown on re login
  logout(): void {
    this.show_dialog = true;
  }

  getUsersPlaylists(): Observable<any> {
    let url: string = `${this.url}/v1/me/playlists?offset=0&limit=50`;
    this.setHeader();
    return this.http.get(url, {headers: this.headers});
  }

  playCurrentSong(playlistID: string = null): Observable<any> {
    let url: string = `${this.url}/v1/me/player/play`;
    this.setHeader();
    if (playlistID != null) {
      return this.http.put(url, {context_uri: playlistID}, {headers: this.headers});
    } else {
      return this.http.put(url, null, {headers: this.headers});
    }
  }

  playATrack(trackID: string) {
    let url: string = `${this.url}/v1/me/player/play`;
    this.setHeader();
    return this.http.put(url, {"uris": [trackID]}, {headers: this.headers});
  }

  pause(): Observable<any> {
    let url: string = `${this.url}/v1/me/player/pause`;
    this.setHeader();
    return this.http.put(url, null, {headers: this.headers});
  }

  nextSong(): Observable<any> {
    let url: string = `${this.url}/v1/me/player/next`;
    this.setHeader();
    return this.http.post(url, null, {headers: this.headers});
  }

  previousSong(): Observable<any> {
    let url: string = `${this.url}/v1/me/player/previous`;
    this.setHeader();
    return this.http.post(url, null, {headers: this.headers});
  }

  toggleShuffle(newState: boolean): Observable<any> {
    let url: string = `${this.url}/v1/me/player/shuffle?state=${newState}`;
    this.setHeader();
    return this.http.put(url, null, {headers: this.headers});
  }

  /**
   *
   * @param {string} oldState must be one of 'track', 'context' or 'off'
   * @returns {Observable<any>}
   */
  toggleRepeat(newState: string): Observable<any> {
    let url: string = `${this.url}/v1/me/player/repeat?state=${newState}`;
    this.setHeader();
    return this.http.put(url, null, {headers: this.headers});
  }

  getUserInfo(): Observable<any> {
    let url: string = `${this.url}/v1/me`;
    this.setHeader();
    return this.http.get(url, {headers: this.headers});
  }

  getAllTracks(url: string): Observable<any> {
    this.setHeader();
    return this.http.get(url, {headers: this.headers});
  }

  getPlaylist(uri: string): Observable<any> {
    let splitURI = uri.split(':');
    let url: string = `${this.url}/v1/users/${this.globals.userID}/playlists/${uri}`;
    this.setHeader();
    return this.http.get(url, {headers: this.headers});
  }

  deleteSongsFromPlayList(playlistID: string, URIsToDelete: string[]): Observable<any> {
    let userId = this.globals.userID;
    let url: string = `${this.url}/v1/users/${userId}/playlists/${playlistID}/tracks`;
    this.setHeader();
    this.headers.set('Content-Type', 'application/json');
    let songs = [];
    let tracks = {tracks: songs};
    URIsToDelete.forEach(uri => songs.push({"uri": uri}));
    return this.http.request('delete', url, {body: tracks, headers: {'Content-Type': 'application/json', 'Authorization': "Bearer " + this.token}});
    // return this.http.request('delete', url, {body: jsonItem, headers: this.headers});
  }

  getCurrentPlayingSong(): Observable<any> {
    let url: string = `${this.url}/v1/me/player/`;
    this.setHeader();
    return this.http.get(url, {headers: this.headers});
  }

  modifyVolume(volume: number) {
    let url: string = `${this.url}/v1/me/player/volume?volume_percent=${volume}`;
    this.setHeader();
    return this.http.put(url, null, {headers: this.headers});
  }

  /**
   * Sets the access token to the given token and
   * TODO: sets a timeout which will notify the user when their token expires
   * @param {string} accessToken
   */
  setHeader() {
    this.headers = new HttpHeaders()
      .set('Authorization', "Bearer " + this.token);
    //need to set a timeout to notify the user when 60minute token expires
  }
}
