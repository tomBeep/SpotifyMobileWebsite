import {Component} from '@angular/core';

import {PlayerPage} from '../player/player';
import {ContactPage} from '../contact/contact';
import {HomePage} from '../home/home';
import {Globals} from "../../app/globals";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  loggedIn: boolean = false;

  tab1Root = HomePage;
  tab2Root = PlayerPage;
  tab3Root = ContactPage;

  name: string;

  constructor(private globals:Globals) {

  }

  login(){
    if(this.name==null || this.name==""){
      return;
    }
    this.loggedIn = true;
    this.globals.name = this.name;
  }
}
