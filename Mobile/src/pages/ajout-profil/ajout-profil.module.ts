import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjoutProfilPage } from './ajout-profil';

@NgModule({
  declarations: [
    AjoutProfilPage,
  ],
  imports: [
    IonicPageModule.forChild(AjoutProfilPage),
  ],
})
export class AjoutProfilPageModule {}
