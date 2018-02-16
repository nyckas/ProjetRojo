import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  personnec=[];
  constructor(public navCtrl: NavController,  public globService: GlobalServiceProvider,public authService:AuthServiceProvider) {
    for(let temp of this.globService.getPersonneConnecte()){
      if(this.authService.getMailUser()!=temp.adresseMail){
        this.personnec.push(temp);
      }
    }
    console.log(this.personnec);
  }
  doRefresh(refresher) {
    this.personnec=[];
    for(var i=0;i< this.globService.getPersonneConnecte().length;i++){
        if(this.globService.getPersonneConnecte()[i].adresseMail!=this.authService.getMailUser()){
          this.personnec.push(this.globService.getPersonneConnecte()[i]);
        }
    }
    console.log(this.personnec);
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
}
