import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GlobalServiceProvider } from '../global-service/global-service';
import 'rxjs/add/operator/map';

/*
  Generated class for the AdresseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdresseServiceProvider {
  apiUrl = this.globalservice.getLienSpring()+'/adresse/';
  constructor(public http: Http,public globalservice: GlobalServiceProvider) {
    console.log('Hello AdresseServiceProvider Provider');
  }

  getAllAdress() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'findAll').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
