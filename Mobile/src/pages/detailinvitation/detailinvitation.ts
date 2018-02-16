import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform, ActionSheetController,AlertController } from 'ionic-angular';
import { PublicationServiceProvider } from '../../providers/publication-service/publication-service';
import {ContactPage} from '../contact/contact';

/**
 * Generated class for the DetailinvitationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailinvitation',
  templateUrl: 'detailinvitation.html',
})
export class DetailinvitationPage {

  responseData:any;
  tempI: any;
  detail: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public pubservice: PublicationServiceProvider,public platform: Platform,public actionsheetCtrl: ActionSheetController, public alertCtrl: AlertController) {
    this.detail=pubservice.getDetInvitation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailinvitationPage');
    
  }

  showAlert(msg:string, title:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  } 


  acceptInvitation(id:String) {
    this.pubservice.acceptInvitation(id)
    .then(data => {
      this.responseData = data;
      console.log(this.responseData._body);
      if(JSON.parse(this.responseData._body)=="0"){
        this.showAlert("Veuillez reessayer!","Erreur");
      }else{
        this.showAlert("Invitation acceptée!","Succes");
        this.navCtrl.push(ContactPage, {}, {animate: false});
      }
    }, (err) => {
      this.showAlert("Veuillez reessayer!","Erreur");
      console.log(err);
    });
    }

    refuseInvitation(id:String) {
      this.pubservice.refuseInvitation(id)
      .then(data => {
        this.responseData = data;
        console.log(this.responseData._body);
        if(JSON.parse(this.responseData._body)=="0"){
          this.showAlert("Veuillez reessayer!","Erreur");
        }else{
          this.showAlert("Invitation supprimée!","Succes");
          this.navCtrl.push(ContactPage, {}, {animate: false});
        }
      }, (err) => {
        this.showAlert("Veuillez reessayer!","Erreur");
        console.log(err);
      });
      }

  openMenu(id:string) {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Options',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Supprimer',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Suppresion');
            this.refuseInvitation(id);
          }
        },
        {
          text: 'Accepter',
          icon: !this.platform.is('ios') ? 'ios-checkmark-circle' : null,
          handler: () => {
            console.log('Acceptation');
            this.acceptInvitation(id);
          }
        },
        {
          text: 'Retour',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'ios-arrow-round-back' : null,
          handler: () => {
            console.log('Retour');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
