import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/index';
import { MAB_GET } from '../store/mockapi/mockapi.actions';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { IMockApi } from '../store/mockapi/mockapi.reducer';


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    private toasterService: ToasterService;
    mockApi$: Observable<IMockApi>;

    public config1: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-top-right'
    });
    constructor(public store: Store<IAppState>,toasterService: ToasterService) {
        this.toasterService = toasterService;
    }
}
