import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { GlobalServiceProvider } from '../global-service/global-service';
import 'rxjs/add/operator/map';

/*
  Generated class for the PublicationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PublicationServiceProvider {

  detInvitation: any;

  apiUrl = this.globalservice.getLienSpring()+'/pub/';

  constructor(public http: Http,public globalservice: GlobalServiceProvider) {
    console.log('Hello PublicationServiceProvider Provider');
  }

  setDetInvitation(inv: any){
    this.detInvitation=inv;
  }

  getDetInvitation(){
    return this.detInvitation;
  }

  creerPlan(data) {
    var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });
      return new Promise(resolve => {
        this.http.post(this.apiUrl+'creer', data, options)
          .subscribe(res => {
            resolve(res);
            console.log(res['_body']);
          }, error => {
            console.log(error);// Error getting the data
          });
        });
  }

  getPublication(mail: String) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'getAllPub',{"mail": mail},options).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getInvitation(mail: String) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'allInvitation',{"mail": mail},options).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getNbInvitation(mail: String) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'nbInvitation',{"mail": mail},options).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  acceptInvitation(id: String){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'accept/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  refuseInvitation(id: String){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'refuse/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  detailInvitation(id: String){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'findInvitationById/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
