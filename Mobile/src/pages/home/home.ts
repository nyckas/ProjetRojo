import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { PublicationServiceProvider } from '../../providers/publication-service/publication-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { CommenterPage } from '../commenter/commenter';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  serverUrl = this.globalService.getLienSpring()+'/socket'
  title = 'WebSockets chat';
  stompClient;
  tempP: any;
  publications: any;
  jaime={personne:'',publication:''};

  constructor(public navCtrl: NavController, public app: App, public pubservice: PublicationServiceProvider, public authservice: AuthServiceProvider, public globalService: GlobalServiceProvider) {
    this.getAllPub();
    this.initializeWebSocketConnection();
  }

   //INITIALISATION CONNECTION SOCKET
   initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat/jaime", (message) => {
        if(message.body) {
          //that.globalService.addPersonneConnecte(JSON.parse(message.body));
          //console.log(message.body);
          that.getAllPub();
        }
      });
    });
  }

  //ENVOIE MESSAGE A LA SOCKET
  jaimer(id:any){
    this.jaime.personne=this.authservice.getMailUser();
    this.jaime.publication=id;
    this.stompClient.send("/app/jaime/jaimer" , {}, JSON.stringify(this.jaime));
  }

  logout(){
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  getAllPub(){
    this.pubservice.getPublication(this.authservice.getMailUser())
    .then(data => {
      this.tempP = data;
      this.publications=JSON.parse(this.tempP._body);
      console.log(this.publications);
    });
  }

  commenterPub(pub:any){
    this.globalService.setIdCurrentPub(pub);
    this.navCtrl.push(CommenterPage);
  }
  doRefresh(refresher) {
    this.getAllPub();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
}
