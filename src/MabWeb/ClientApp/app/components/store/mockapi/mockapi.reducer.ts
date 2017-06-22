import { Action, ActionReducer } from '@ngrx/store';
import { MAB_GET_SUCCESS, MAB_ADD_SUCCESS,MAB_ADD_FAIL } from './mockapi.actions';
import { ToasterService } from 'angular2-toaster';
import { AppModule } from '../../../app.module';
import { MockApi } from '../../mockapi/mock';

export interface IMockApi {
    name:string;
    routeTemplate:string;
    body:string;
    verb:string;
    language:string;
}

export const mockApiReducer: ActionReducer<IMockApi[]> = (state:Array<IMockApi> = [], action: Action): IMockApi [] => {
  switch (action.type) {

    case MAB_GET_SUCCESS:
      return Object.assign({}, action.payload);

    case MAB_ADD_SUCCESS:
            const jsonObject: any = action.payload;
             
            if (200 <= jsonObject.statusCode && jsonObject.statusCode <= 300) {
                console.log("Http Response status :" + jsonObject.statusCode + "," + jsonObject.reasonPhrase);
            }
            else 
            {
               console.error("Http Response status :" + jsonObject.statusCode + "," + jsonObject.reasonPhrase);
            }
        //return [...state, action.payload];
            return Object.assign({}, state, {
                error: jsonObject.reasonPhrase
            });
         
    case MAB_ADD_FAIL:
          {
              
          }
        

    default:
      return state;
  }
};

export const getLoading = (state: MockApi) => state.isLoading;

export const getErrorMessage = (state: MockApi) => state.error;

const addMock = (state, action) => {
    switch (action.type) {
        case MAB_ADD_SUCCESS:
            return {
                name: action.payload.name,
                routeTemplate: action.payload.routeTemplate,
                body: action.payload.body,
                verb: action.payload.verb,
                language: 'Javascript'
            };
    }
}
