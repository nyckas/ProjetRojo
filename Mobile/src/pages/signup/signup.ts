import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AjoutProfilPage } from '../ajout-profil/ajout-profil';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  responseData : any;
  user = { name: '', lastname: '', naissance: '', mail: '', password: '', confirm: ''};
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public authService:AuthServiceProvider, 
    public alertCtrl: AlertController, 
    public loading:LoadingController,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  showAlert(titre:string,msg:string) {
    let alert = this.alertCtrl.create({
      title: titre,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  inscription() {
    let alert=this.loading.create(
      {
        content:"Veuillez patienter... ",
      }
    );
    alert.present();
    this.authService.signIn(this.user).then(data => {
      alert.dismiss();
      this.responseData = data;
      console.log(this.responseData._body);
      if(JSON.parse(this.responseData._body).id=="0"){
        this.showAlert("Erreur","Votre compte n'a pas pu être créer!");
      }else if(JSON.parse(this.responseData._body).id=="1"){
        this.showAlert("Attention","L'email existe déja!");
      }else{
        this.showAlert("Succes","Votre compte a été créé!");
        this.navCtrl.push(AjoutProfilPage, {idUser:JSON.parse(this.responseData._body).id}, {animate: false});
      }
    }, (err) => {
      this.showAlert("Erreur", "Veuillez reessayer!");
      console.log(err);
    });
  }

  //FONCTIONS LOGIN AVEC VALIDATION
  saveUser() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'top'
    });
    if (this.user.name == '' || this.user.lastname == ''|| this.user.naissance == ''|| this.user.mail == ''|| this.user.password == ''|| this.user.confirm == '') {
      toaster.setMessage('Veuillez completer tous les Champs');
      toaster.present();
    }
    else if (this.user.password.length<7 || this.user.password !=this.user.confirm) {
          if(this.user.password !=this.user.confirm){
              toaster.setMessage("Verifier que les mots de passe soient identiques");
              toaster.present();
          }else{
            toaster.setMessage("Le mot de passe doit contenir au moins six caractère");
              toaster.present();
          }
    }
    else {
      this.inscription();
    }
  }

}
