import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { PublicationServiceProvider } from '../../providers/publication-service/publication-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {DetailinvitationPage} from '../detailinvitation/detailinvitation';
import {ContactPage} from '../contact/contact';

/**
 * Generated class for the ListinvitationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listinvitation',
  templateUrl: 'listinvitation.html',
})
export class ListinvitationPage {

  responseData:any;
  tempI: any;
  invitations: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public pubservice: PublicationServiceProvider, public authservice: AuthServiceProvider, public alertCtrl: AlertController) {
    this.getAllInvitation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListinvitationPage');
  }

  getAllInvitation(){
    this.pubservice.getInvitation(this.authservice.getMailUser())
    .then(data => {
      this.tempI = data;
      this.invitations=JSON.parse(this.tempI._body);
      console.log(this.invitations);
    });
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

      detailInvitation(id: String){
        this.pubservice.detailInvitation(id)
      .then(data => {
        this.responseData = data;
        //console.log(this.responseData._body);
        this.pubservice.setDetInvitation(JSON.parse(this.responseData._body));
        this.navCtrl.push(DetailinvitationPage, {}, {animate: false});
      }, (err) => {
        this.showAlert("Veuillez reessayer!","Erreur");
        console.log(err);
      });
      }

}
