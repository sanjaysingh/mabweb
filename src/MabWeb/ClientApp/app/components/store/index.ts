import { combineReducers, ActionReducer, Action, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { compose } from '@ngrx/core';
import { storeFreeze } from 'ngrx-store-freeze';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { mockApiReducer, IMockApi } from './mockapi/mockapi.reducer';
import { MockApiEffects } from './mockapi/mockapi.effects';

import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';

// all new reducers should be define here
export interface IAppState {
  mockApi: IMockApi;
}

// all new reducers should be define here
const reducers = {
    mockApi: mockApiReducer
};

const productionReducer: ActionReducer<IAppState> = combineReducers(reducers);
const developmentReducer: ActionReducer<IAppState> = compose(storeFreeze, combineReducers)(reducers);

export function reducer(state: IAppState, action: Action) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

@NgModule()
export class DummyModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CommonModule
    };
  }
}

export const store: ModuleWithProviders = StoreModule.provideStore(reducer);
export const instrumentation: ModuleWithProviders =
  (!environment.production) ? StoreDevtoolsModule.instrumentOnlyWithExtension() : DummyModule.forRoot();

export const effects: ModuleWithProviders[] = [
    EffectsModule.run(MockApiEffects)
];
