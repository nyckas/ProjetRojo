import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController  } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AdresseServiceProvider } from '../../providers/adresse-service/adresse-service';
import { InteretServiceProvider } from '../../providers/interet-service/interet-service';
import { PublicationServiceProvider } from '../../providers/publication-service/publication-service';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the CreerPlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-creer-plan',
  templateUrl: 'creer-plan.html',
})
export class CreerPlanPage {
  tempA: any;
  tempI: any;
  lieux: any;
  interets:any;
  responseData : any;

  nouvPlan={ mailUser: '', titre: '', daty: '', idinteret: '', idadresse: '', paff: '',detail: ''};
  constructor(public navCtrl: NavController, public loading:LoadingController, public alertCtrl: AlertController, public navParams: NavParams, public adresseservice:AdresseServiceProvider, public interetservice:InteretServiceProvider,public userservice:AuthServiceProvider,public pubservice:PublicationServiceProvider) {
    this.nouvPlan.mailUser=this.userservice.getMailUser();
    this.getAllInteret();
    this.getAllAdress();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreerPlanPage');
  }

  getAllAdress() {
    this.adresseservice.getAllAdress()
    .then(data => {
      this.tempA = data;
      this.lieux=JSON.parse(this.tempA._body);
      console.log(this.lieux);
    });
  }

  getAllInteret() {
    this.interetservice.getAllInteret()
    .then(data => {
      this.tempI = data;
      this.interets=JSON.parse(this.tempI._body);
      console.log(this.interets);
    });
  }

  showAlert(titre:string,msg:string) {
    let alert = this.alertCtrl.create({
      title: titre,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  creer(){
    let alert=this.loading.create(
      {
        content:"Veuillez patienter... ",
      }
    );
    alert.present();
    this.pubservice.creerPlan(this.nouvPlan).then(data => {
      alert.dismiss();
      this.responseData = data;
      console.log(this.responseData._body);
      if(JSON.parse(this.responseData._body)=="0"){
        this.showAlert("Erreur","Votre évènement n'a pas pu être créé!");
      }else if(JSON.parse(this.responseData._body)=="1"){
        this.showAlert("Succes","Votre évènement a été créé!");
      }else{
        this.navCtrl.push(TabsPage, {}, {animate: false});
      }
    }, (err) => {
      this.showAlert("Erreur", "Veuillez reessayer!");
      console.log(err);
    });
    //console.log(this.nouvPlan);
  }

}
