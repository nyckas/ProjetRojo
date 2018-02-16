import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GlobalServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalServiceProvider {

  private personneConnecte= [];
  private currentPub: any;
  private currentUser: any;
  lienSpring='https://cryptic-sands-30430.herokuapp.com';

  constructor(public http: Http) {
    console.log('Hello GlobalServiceProvider Provider');
  }

  getPersonneConnecte(){
    return this.personneConnecte;
  }

  addPersonneConnecte(personne: any){
    this.personneConnecte.push(personne);
  }

  getIdCurrentPub(){
    return this.currentPub;
  }

  setIdCurrentPub(pub:any){
    this.currentPub=pub;
  }

  getCurrentUser(){
    return this.currentUser;
  }

  setCurrentUser(user: any){
    this.currentUser=user;
  }

  getLienSpring(){
    return this.lienSpring;
  }

  refreshPersonneConnecte(){
    this.personneConnecte=[];
  }

}
