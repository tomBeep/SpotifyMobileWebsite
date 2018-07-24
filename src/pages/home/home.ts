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

  }

}
