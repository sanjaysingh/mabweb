import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { MockApiModule } from './components/mockApi/mockapi.module';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
//import { HomeComponent } from './components/home/home.component';

const routes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'mock' },
    { path: 'collections/:name/add', component: AddComponent },
    //{ path: 'home', component: HomeComponent },
    { path: '', loadChildren: () => MockApiModule },
    {
        path: 'collections/:name', component: ListComponent
    },
    { path: 'add', component: AddComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
    routes,
    {
        useHash: false
    }
);
