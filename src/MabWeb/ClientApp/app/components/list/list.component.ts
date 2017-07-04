
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/index';
import { Observable } from 'rxjs/Observable';
import { IMockApi } from '../store/mockapi/mockapi.reducer';
import { MAB_GET, MAB_GET_FAIL, MAB_GET_SUCCESS } from '../store/mockapi/mockapi.actions';
import { ToasterService } from 'angular2-toaster';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})

export class ListComponent implements OnInit{
    mockApi$: Observable<IMockApi>;
    date: Date = new Date();
    isFetching: boolean = true;
    options: any = { maxLines: 1000, printMargin: false};

    constructor(public store: Store<IAppState>, private activatedRoute: ActivatedRoute, private router: Router,private toaster: ToasterService) {
        this.mockApi$ = this.store.select('mockApi');
    }

    ngOnInit(): void {
        let name = this.activatedRoute.snapshot.params['name'] as string;
        this.toaster.pop('success', 'Mock API Builder', 'Loading collections for ' + name);
        this.store.dispatch({
            type: MAB_GET,
            payload: name
        });
        this.isFetching = false;
    }

    getCollection(collectionName: string): void {
        this.store.dispatch({
            type: MAB_GET,
            payload: collectionName
        });
    }

    add(): void {
        let name = this.activatedRoute.snapshot.params['name'] as string;
        this.router.navigate(['./newapi'], { relativeTo: this.activatedRoute });
    }
}
