import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController} from 'ionic-angular';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { CommentaireServiceProvider } from '../../providers/commentaire-service/commentaire-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

/**
 * Generated class for the CommenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commenter',
  templateUrl: 'commenter.html',
})
export class CommenterPage {
  serverUrl = this.globalService.getLienSpring()+'/socket'
  title = 'WebSockets chat';
  stompClient;

  comments={personne:'',publication:'',commentaire:''};
  tempC: any;
  tempCT: any;
  tabBarElement: any;
  listCommentaire= [];
  publication: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService:AuthServiceProvider,
    public globalService: GlobalServiceProvider,
    public toastCtrl: ToastController, 
    public commentaireservice: CommentaireServiceProvider) {

    this.initializeWebSocketConnection();
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.publication=this.globalService.getIdCurrentPub();
    this.getAllCommentaire();
  }

   //INITIALISATION CONNECTION SOCKET
   initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat/"+that.globalService.getIdCurrentPub().id, (message) => {
        if(message.body) {
          //this.globService.addPersonneConnecte(JSON.parse(message.body));
          console.log(JSON.parse(message.body));
          that.listCommentaire.push(JSON.parse(message.body));
          if(JSON.parse(message.body).personne.adresseMail!=that.authService.getMailUser()){
            that.showToast(JSON.parse(message.body).personne.prenom+" a commenté une publication");
          }
        }
      });
    });
  }

  //ENVOIE MESSAGE A LA SOCKET
  commenter(){
    //MI-AFFICHER AN'ILAY COMMENTAIRE VAO AVY NOTAPENA
    //this.comments.personne=JSON.parse(this.globalService.getCurrentUser());
    //this.listCommentaire.push(Object.assign({},this.comments));
    //console.log(this.comments);

    //MI-ENREGISTRE AN'ILAY COMMENTAIRE VAO AVY NOTAPENA ANY ANATY BDD
    this.comments.publication=this.globalService.getIdCurrentPub().id;
    this.comments.personne=this.authService.getMailUser();
    this.stompClient.send("/app/send/commentaire" , {}, JSON.stringify(this.comments));
    this.comments.commentaire="";
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CommenterPage');
  }
  
  takeMeBack() {
    this.navCtrl.parent.select(0);
  }

  getAllCommentaire(){
    this.commentaireservice.getAllCommentaire(this.globalService.getIdCurrentPub().id)
    .then(data => {
      this.tempC = data;
      this.tempCT=JSON.parse(this.tempC._body);
      for(let tmp of this.tempCT){
        this.listCommentaire.push(tmp);
      }
      console.log(this.listCommentaire);
    });
  }

  showToast(messagy:any) {
    let toast = this.toastCtrl.create({
      message: messagy,
      duration: 2000,
      position: 'top'
    });

    toast.present(toast);
}
}
