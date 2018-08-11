import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FullSongInfoPage } from './full-song-info';

@NgModule({
  declarations: [
    FullSongInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(FullSongInfoPage),
  ],
})
export class FullSongInfoPageModule {}
