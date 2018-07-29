import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataService} from "../../app/dataService";
import {of} from "rxjs/observable/of";
import {SettingsPage} from "../settings/settings";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userData: any;

  constructor(public navCtrl: NavController, public data: DataService) {

  }

  ngOnInit() {
    this.data.getUserInfo().subscribe(data => {
      this.userData = data;
    });
  }

  moveToSettingsPage(): void {
    this.navCtrl.push(SettingsPage);
  }

  logout():void{
    console.log("logging out");
  }

}
