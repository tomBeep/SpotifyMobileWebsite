import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DuplicateFinderPage } from './duplicate-finder';

@NgModule({
  declarations: [
    DuplicateFinderPage,
  ],
  imports: [
    IonicPageModule.forChild(DuplicateFinderPage),
  ],
})
export class DuplicateFinderPageModule {}
