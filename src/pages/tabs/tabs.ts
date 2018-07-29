import {Component} from '@angular/core';

import {PlayerPage} from '../player/player';
import {HomePage} from '../home/home';
import {Globals} from "../../app/globals";
import {EditorPage} from "../editor/editor";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  loggedIn: boolean = false;

  tab1Root = HomePage;
  tab2Root = PlayerPage;
  tab3Root = EditorPage;

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
