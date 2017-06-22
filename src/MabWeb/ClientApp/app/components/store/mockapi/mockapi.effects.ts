import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';

import { MAB_GET, MAB_GET_FAIL, MAB_GET_SUCCESS, MAB_ADD, MAB_ADD_SUCCESS, MAB_ADD_FAIL } from './mockapi.actions';
import { MockApiService } from '../../mockapi/mockapi.service';
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class MockApiEffects {

  @Effect()
  mabGet$ = this.actions$
    .ofType(MAB_GET)
    .switchMap((action: Action) => {
    return this.mockApiService.getCollection(action.payload)
        .map((response: Response) => response.json())
        .catch(() => Observable.of(({ type: MAB_GET_FAIL })))
        .map((response) => ({type: MAB_GET_SUCCESS, payload: response}));

      });

  @Effect()
  addMab$ = this.actions$
      .ofType(MAB_ADD)
      .switchMap((action: Action) => {
          return this.mockApiService.createApi(action.payload)
              .map((response: Response) => response.json())
              .map((response) => ({ type: MAB_ADD_SUCCESS, payload: response }))
              .catch((error:any) => this.handleError(error))
              //.catch((response: Response) => Observable.of(({ type: MAB_GET_FAIL, payload: response })))
      });

  handleError(error: any) {
      console.error("ERROR!" + JSON.stringify(error));
      this.toaster.pop('error', 'API Service Error', "Http Response status :" + error.status + "," + error.statusText);
      let errMsg: string;
      if (error instanceof Response) {
          try {
              errMsg = error.json();
          } catch (e) {
              // No content response..
              errMsg = null;
          }
      }
      console.log("ERROR!!"+ errMsg);
      return Observable.throw(errMsg);
  }
  constructor(private actions$: Actions, private mockApiService: MockApiService, private http: Http,private toaster: ToasterService) {}
}
