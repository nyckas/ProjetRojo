import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { GlobalServiceProvider } from '../global-service/global-service';
import 'rxjs/add/operator/map';


/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  apiUrl = this.globalservice.getLienSpring()+'/user/';

  mailUser: any;

  constructor(public http: Http,public globalservice: GlobalServiceProvider) {
    console.log('Hello AuthServiceProvider Provider');
  }

  getMailUser(){
    return this.mailUser;
  }

  setMailUser(email:String){
    this.mailUser=email;
  }

  login(data) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
  return new Promise(resolve => {
    this.http.post(this.apiUrl+'login',data,options).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

signIn(data) {
  var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'signup', data, options)
        .subscribe(res => {
          resolve(res);
          console.log(res['_body']);
        }, error => {
          console.log(error);// Error getting the data
        });
      });
}

saveProfil(data) {
  var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'saveprofil', data, options)
        .subscribe(res => {
          resolve(res);
          console.log(res['_body']);
        }, error => {
          console.log(error);// Error getting the data
        });
      });
}

}
