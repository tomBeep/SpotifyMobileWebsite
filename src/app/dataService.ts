import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";


@Injectable()
export class DataService {

  token: string;
  private url: string = "https://api.spotify.com";
  private headers: HttpHeaders;//this header contains the Spotify token if logged in.

  constructor(private http: HttpClient) {

  }

  loginToSpotify():void {
    let publicKey: string = '75ac4d84a5dd44e8bf22810fdbe366a1';
    let callbackURL: string = "http://localhost:8100";
    let url: string = `https://accounts.spotify.com/authorize?client_id=${publicKey}&response_type=token&scope=streaming&redirect_uri=${callbackURL}`;
    window.location.href = url;
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
