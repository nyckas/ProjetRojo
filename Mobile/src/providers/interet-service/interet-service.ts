import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GlobalServiceProvider } from '../global-service/global-service';
import 'rxjs/add/operator/map';

/*
  Generated class for the InteretServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InteretServiceProvider {

  apiUrl = this.globalservice.getLienSpring()+'/interet/';

  constructor(public http: Http,public globalservice: GlobalServiceProvider) {
    console.log('Hello InteretServiceProvider Provider');
  }

  getAllInteret() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'getAll').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
