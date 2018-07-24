import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataService} from "../../app/dataService";
import {of} from "rxjs/observable/of";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userData :any;

  constructor(public navCtrl: NavController,public data : DataService) {

  }
  ngOnInit(){
    this.data.getUserInfo().subscribe(data=>{
      this.userData = data;
    });
  }

}
