import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  serverUrl = this.globalService.getLienSpring()+'/socket'
  title = 'WebSockets chat';
  stompClient;
  responseData : any;
  userData = {"login": "","password": ""};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService:AuthServiceProvider, 
    public alertCtrl: AlertController, 
    public loading:LoadingController,
    public toastCtrl: ToastController,
    public globalService: GlobalServiceProvider) {

    this.initializeWebSocketConnection();
  }

  //INITIALISATION CONNECTION SOCKET
  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        if(message.body) {
          that.globalService.refreshPersonneConnecte();
          for(let user of JSON.parse(message.body)){
            if(that.authService.getMailUser()!=user.adresseMail)
            that.globalService.addPersonneConnecte(user);
            console.log("AUTRES",user.adresseMail);
          }
          console.log("CONNECTE",JSON.parse(message.body));
        }
      });
    });
  }

  //ENVOIE MESSAGE A LA SOCKET
  sendMessage(message){
    this.stompClient.send("/app/welcome" , {}, message);
  }

  //AFFICHAGE LOADING
  showLoading(){
    let alert=this.loading.create(
      {
        content:"Veuillez patienter... ",
      }
    );
    alert.present();
  }

  //AFFICHAGE ALERT
  showAlert(msg:string) {
    let alert = this.alertCtrl.create({
      title: 'Erreur!',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  //FONCTION CONNECTION
  connection() {
    let alert=this.loading.create(
      {
        content:"Veuillez patienter... ",
      }
    );
    alert.present();
    this.authService.login(this.userData)
    .then(data => {
      alert.dismiss();
      this.responseData = data;
      //console.log(this.responseData._body);
      if(JSON.parse(this.responseData._body).id=="0"){
        this.showAlert("Ce compte n'existe pas");
      }else if(JSON.parse(this.responseData._body).id=="1"){
        this.showAlert("Mot de passe incorrect");
      }else{
        this.authService.setMailUser(JSON.parse(this.responseData._body).adresseMail);
        this.globalService.setCurrentUser(this.responseData._body);
        //console.log("CURRENT USER",JSON.parse(this.globalService.getCurrentUser()));
        this.sendMessage(this.responseData._body);
        this.navCtrl.push(TabsPage, {}, {animate: false});
      }
    }, (err) => {
      this.showAlert("Veuillez reessayer!");
      console.log(err);
    });
    }

    //IONVIEW DID LOAD
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  //FONCTIONS LOGIN AVEC VALIDATION
  logins() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'top'
    });
    if (this.userData.login == '' || this.userData.password == '') {
      toaster.setMessage('Veuillez completer tous les Champs');
      toaster.present();
    }
    else if (this.userData.password.length < 7) {
      toaster.setMessage('Mot de passe doit contenir au moins six caractère');
      toaster.present();
    }
    else {
      this.connection();
    }
  }

}






