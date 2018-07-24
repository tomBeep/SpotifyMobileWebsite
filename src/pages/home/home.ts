import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {Globals} from "../../app/globals";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public globals:Globals) {

  }
  ngOnInit(){
    this.showAlert();
  }


  showAlert() {
    var greeting = "Hello "+this.globals.name;
    const alert = this.alertCtrl.create({
      title: 'SWEN325 App!',
      subTitle: greeting,
      buttons: ['OK']
    });
    alert.present();
  }
}
