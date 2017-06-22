import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/index';
import { Observable } from 'rxjs/Observable';
import { IMockApi } from '../store/mockapi/mockapi.reducer';
import { MockApi } from '../mockapi/mock';
import { MockApiService } from '../mockapi/mockapi.service';
import { ToasterService } from 'angular2-toaster';

import { MAB_GET, MAB_GET_FAIL, MAB_GET_SUCCESS, MAB_ADD, MAB_ADD_FAIL,MAB_ADD_SUCCESS } from '../store/mockapi/mockapi.actions';
export interface FormModel {
    captcha?: string;
}
@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
})


export class AddComponent implements OnInit {
    form: FormGroup;
    myGroup: FormGroup;
    errorMessage: string;
    collectionName: string;
    isOldCollection: boolean;
    isFetching: boolean = false;

    constructor(public fb: FormBuilder, public store: Store<MockApi>, private mockApiService: MockApiService, private activatedRoute: ActivatedRoute, private router: Router,private toaster: ToasterService) {
        let name = this.activatedRoute.snapshot.params['name'] as string;
        this.collectionName = name;
        if (this.collectionName === "")
            this.isOldCollection = false;
        
        this.form = new FormGroup({
            name: new FormControl({ value: this.collectionName, disabled: this.isOldCollection }),
            api: new FormGroup({
                name: new FormControl(''),
                routeTemplate: new FormControl(''),
                body: new FormControl('function run(req, res) { \n res.send({\n \n//sum: req.content.num1 + req.content.num2 \n\n});}'),
                verb: new FormControl('POST'),
                captcha: new FormControl('') 
            })
        });
        this.myGroup = new FormGroup({
            captcha: new FormControl()
        });
    }

    httpVerbs = ['GET', 'POST'];
    public formModel: FormModel = {};

    ngOnInit():void {
    }

    reset():void{
        this.form.reset();
    }

    backToCollections(form: MockApi): void {
        this.router.navigate(['collections', form.name]);
    }

    addCollection({ value, valid }: { value: MockApi, valid: boolean }) {
        if (this.form.valid && this.myGroup.valid) {
            value.name = this.form.get('name').value;
            this.isFetching = true;
            this.mockApiService.createApi(value)
                .subscribe((response) => {
                    const customResponse: any = response;
                    const jsonObject: any = JSON.parse(customResponse._body);
                    
                    if (200 <= jsonObject.statusCode && jsonObject.statusCode <= 300) {
                        this.toaster.pop('success', 'MAB API Service', "New API added successfully");
                        this.router.navigate(['/collections', value.name]);
                    }
                    else {
                        let errorMessage: string = "";
                        if (jsonObject.statusCode == 409) {
                            errorMessage = "Collection with name " + name + " already exists";
                        }
                        this.toaster.pop('error', 'API Service Error', "Status code:" + jsonObject.statusCode + " error: " + jsonObject.reasonPhrase + "\n" + errorMessage);
                        this.isFetching = false;
                    }

                }, error => {
                    this.isFetching = false;
                    console.log(error);
                });
        }
    }
}
