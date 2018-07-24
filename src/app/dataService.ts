import {Injectable} from "@angular/core";


@Injectable()
export class DataService {

  callbackURL: string = "http://localhost:8100";
  token:string;

  constructor() {

  }

  loginToSpotify() {
    let publicKey: string = '75ac4d84a5dd44e8bf22810fdbe366a1';
    let callbackURL: string = "http://localhost:8100";
    let url: string = `https://accounts.spotify.com/authorize?client_id=${publicKey}&response_type=token&scope=playlist-modify-private&redirect_uri=${callbackURL}`;
    window.location.href = url;
  }

}
