import {Injectable} from "@angular/core";


@Injectable()
export class Globals {

  name: string;//the name of the user.
  premiumUser: boolean;//whether or not the user is standard or premium
  userID: string;//the id of the user
  playSong: string;//the song that should be played next time the player is opened.

  constructor() {

  }


  static printArtistsNice(artists: any[]): string {
    let trackArtists = "";
    artists.forEach(artist => trackArtists = trackArtists.concat(artist.name + ", "));
    trackArtists = trackArtists.substring(0, trackArtists.length - 2);
    return trackArtists;
  }
}
