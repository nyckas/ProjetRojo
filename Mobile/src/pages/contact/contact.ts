import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import {ListinvitationPage} from '../listinvitation/listinvitation';
import {CreerPlanPage} from '../creer-plan/creer-plan';
import { PublicationServiceProvider } from '../../providers/publication-service/publication-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  tempP: any;
  nbInvitations: any;

  constructor(public navCtrl: NavController, public app: App, public pubservice: PublicationServiceProvider, public authservice: AuthServiceProvider) {
    this.getNbInvitation();
  }
  
  logout(){
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  creerPlan(){
    this.navCtrl.push(CreerPlanPage);
  }

  listInvitation(){
    this.navCtrl.push(ListinvitationPage);
  }

  getNbInvitation(){
    this.pubservice.getNbInvitation(this.authservice.getMailUser())
    .then(data => {
      this.tempP = data;
      this.nbInvitations=JSON.parse(this.tempP._body);
      console.log(this.nbInvitations);
    });
  }

  doRefresh(refresher) {
    this.getNbInvitation();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
}
