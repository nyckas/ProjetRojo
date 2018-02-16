import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommenterPage } from './commenter';

@NgModule({
  declarations: [
    CommenterPage,
  ],
  imports: [
    IonicPageModule.forChild(CommenterPage),
  ],
})
export class CommenterPageModule {}
