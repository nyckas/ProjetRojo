import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { GlobalServiceProvider } from '../global-service/global-service';
import 'rxjs/add/operator/map';

/*
  Generated class for the CommentaireServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommentaireServiceProvider {

  apiUrl = this.globalservice.getLienSpring()+'/commentaire/';

  constructor(public http: Http,public globalservice: GlobalServiceProvider) {
    console.log('Hello CommentaireServiceProvider Provider');
  }

  getAllCommentaire(id: String) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'allComments',{"id": id},options).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
