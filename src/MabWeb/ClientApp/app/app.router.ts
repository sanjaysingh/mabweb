import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { MockApiModule } from './components/mockApi/mockapi.module';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
//import { HomeComponent } from './components/home/home.component';

const routes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'mock' },
    { path: 'collection/:name/newapi', component: AddComponent },
    { path: '', loadChildren: () => MockApiModule },
    {
        path: 'collection/:name', component: ListComponent
    },
    { path: 'newcollection', component: AddComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
    routes,
    {
        useHash: false
    }
);
