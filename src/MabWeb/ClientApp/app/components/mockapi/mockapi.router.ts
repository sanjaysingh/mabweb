import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { MockApiComponent } from './mockapi.component';
//import { EditComponent } from './edit/edit.component';

const routes: Route[] = [
  {
    path: '',
    component: MockApiComponent
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
