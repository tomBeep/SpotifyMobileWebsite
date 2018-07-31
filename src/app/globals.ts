import {Injectable} from "@angular/core";


@Injectable()
export class Globals {

  name: string;
  premiumUser: boolean;
  userID: string;
  playSong: string;

  constructor() {

  }


  static printArtistsNice(artists: any[]): string {
    let trackArtists = "";
    artists.forEach(artist => trackArtists = trackArtists.concat(artist.name + ", "));
    trackArtists = trackArtists.substring(0, trackArtists.length - 2);
    return trackArtists;
  }
}
