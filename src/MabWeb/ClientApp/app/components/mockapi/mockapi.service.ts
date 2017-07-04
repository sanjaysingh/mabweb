import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MockApi } from './Mock';
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class MockApiService {

    constructor(public http: Http, private toaster: ToasterService) {}

/**
   * Collection reference
   *
   * @param name
   * @returns {Observable<Response>}
   */
  getCollection(name: string): Observable<{}> {
      return this.http.get(`/mabservice/intapi/collection/${name}`,{});
  }

  createApi(mockapi: MockApi) {
      return this.http.post(`/mabservice/intapi/collection/${mockapi.name}/mockapi`, mockapi.api);
  }

  getCollectionReference(name:string) {
      return this.http.get(`/mabservice/intapi/collectionreference/${name}`, {});
  }

  createCollection(name: string) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      //headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
      let options = new RequestOptions({ headers: headers });
      let body = JSON.stringify({ "collectionName": "" + name + "" });
      return this.http.post(`/mabservice/intapi/collection/`, body, options);
  }

  handleError(error: any) {
      console.error(error);
      const errorMsg: any = "Http Response status :" + error.statusCode + "," + error.reasonPhrase;
      this.toaster.pop('error', 'API Service Error', errorMsg);
      return Observable.throw(errorMsg || 'Server error');
  }
}
