import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams, LoadingController, ToastController, ActionSheetController,Platform,AlertController  } from 'ionic-angular';
import { AdresseServiceProvider } from '../../providers/adresse-service/adresse-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { Base64 } from '@ionic-native/base64';
import firebase from 'firebase';

/**
 * Generated class for the AjoutProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout-profil',
  templateUrl: 'ajout-profil.html',
})
export class AjoutProfilPage {

  tempPhoto:any;
  public myPhotosRef: any;
  public myPhoto: any;
  tempA: any;
  lieux: any;
  responseData: any;
  user = {idUser: "", adresse: "",telephone: "",photo: ""};

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public adresseservice:AdresseServiceProvider,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public alertCtrl: AlertController, 
    private base64: Base64,
    public authService:AuthServiceProvider,
    public actionSheetCtrl: ActionSheetController) {
    this.user.idUser=this.navParams.get('idUser');
    console.log("ID USER",this.user.idUser);
    this.getAllAdress();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutProfilPage');
  }

  getAllAdress() {
    this.adresseservice.getAllAdress()
    .then(data => {
      this.tempA = data;
      this.lieux=JSON.parse(this.tempA._body);
      console.log(this.lieux);
    });
  }

  choisirPhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.base64.encodeFile(imageData).then((base64File: string) => {
        this.tempPhoto =base64File;
      }, (err) => {
        this.presentToast(err);
        console.log(err);
      });
      this.tempPhoto = "data:image/jpeg;base64," + imageData;
      this.myPhoto = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  prendrePhoto() {
    //this.user.photo="image.jpg"
    const options : CameraOptions = {
      quality: 100, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: true,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options) .then((imageData) => {
        /*this.user.photo = "data:image/jpeg;base64," + imageData;
        this.user.photo="image.jpg"*/
        this.tempPhoto = "data:image/jpeg;base64," + imageData;
        this.myPhoto = imageData;
      }, (err) => {
        console.log(err);
      });
  }

  public choixImage() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Choisir dans la gallerie',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.choisirPhoto();
          }
        },
        {
          text: 'Utiliser appareil photo',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.prendrePhoto();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'ios-arrow-round-back' : null,
        }
      ]
    });
    actionSheet.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  showAlert(titre:string,msg:string) {
    let alert = this.alertCtrl.create({
      title: titre,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  sauver() {
    let alert=this.loadingCtrl.create(
      {
        content:"Veuillez patienter... ",
      }
    );
    alert.present();
    this.authService.saveProfil(this.user).then(data => {
      alert.dismiss();
      this.responseData = data;
      console.log(this.responseData._body);
      if(JSON.parse(this.responseData._body).id=="0"){
        this.showAlert("Erreur","On n'a pas pu enregistre vos informations!");
      }else{
        this.showAlert("Succes","Vos informations ont été enregistrées avec succes!");
        this.navCtrl.push(LoginPage, {}, {animate: false});
      }
    }, (err) => {
      this.showAlert("Erreur", "Veuillez reessayer!");
      console.log(err);
    });
  }

  //UPLOAD IMAGE-----------------------------------------------------------------------------------------------------------

  private uploadPhoto(): void {
    this.myPhotosRef.child(this.generateUUID()).child('myPhoto.png')
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.user.photo = savedPicture.downloadURL;
      });
  }
 
  private generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  //FONCTIONS LOGIN AVEC VALIDATION----------------------------------------------------------------------------------------------------------
  sauvegarder() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'top'
    });
    if (this.user.idUser == '' || this.user.adresse == ''|| this.user.photo == ''|| this.user.telephone == '') {
      toaster.setMessage('Veuillez completer tous les Champs');
      toaster.present();
    }
    else {
      this.uploadPhoto();
      this.sauver();
    }
  }
}
