import { Component  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/index';
import { Observable } from 'rxjs/Observable';
import { IMockApi } from '../store/mockapi/mockapi.reducer'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MockApiService } from '../mockapi/mockapi.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-profile',
  templateUrl: './mockapi.component.html'
})
export class MockApiComponent {
    isFetching: boolean = false;

constructor(public fb: FormBuilder, public store: Store<IAppState>, private router: Router, private mockApiService: MockApiService, private toaster: ToasterService, private activatedRoute: ActivatedRoute) {}

   
  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  getCollection(searchForm: FormGroup): void {
      if (searchForm.valid) {
          this.isFetching = true;
          this.mockApiService.getCollectionReference(searchForm.value.text)
              .subscribe((response) => {
                  this.isFetching = false;
                  if (200 <= response.status && response.status <= 300) {
                      this.router.navigate(['collections', searchForm.value.text]);
                  }
                  else {
                      this.toaster.pop('error', 'API Service Error', "Http Response status :" + response.status + "," + response.statusText);
                  }
              }, error => {
                   if (error.status == 404) {
                      this.toaster.pop('error', 'API Service Error', "Collection with name " + searchForm.value.text + " does not exists,\n please create a new collection");
                   }
                   else {
                       this.toaster.pop('error', 'API Service Error', "Status code:" + error.status + " error: " + error.statusText);
                   }
                  this.isFetching = false;
              });
      }
   }

   addNewCollection(searchForm: FormGroup) : void {
       let name = searchForm.value.text;
       if (name === "") {
           this.toaster.pop('error', 'MAB UI Error', "Collection name is empty or invalid");
       }
       if (name !== "") {
           this.isFetching = true;
           this.mockApiService.getCollectionReference(name)
               .subscribe((response) => {
                   this.isFetching = false;
                   this.toaster.pop('error', 'MAB API Service', "Http Response status :" + response.status + "," + response.statusText);
               }, error => {
                   if (error.status == 404) {
                       this.createCollection(name);
                   }
                   else {
                       this.toaster.pop('error', 'API Service Error', "Status code:" + error.status + " error: " + error.statusText);
                   }
               });
       }
   }

   createCollection(name: string) {
       this.mockApiService.createCollection(name)
           .subscribe((response) => {
               this.isFetching = false;
               if (200 <= response.status && response.status <= 300) {
                   this.toaster.pop('success', 'MAB API Service', "New collection created successfully");
               }
               else {
                   let errorMessage: string = "";
                   if (response.status == 409)
                   {
                       errorMessage = "Collection with name " + name + " already exists";
                   }
                   this.toaster.pop('error', 'MAB API Service', "Status code:" + response.status + " error: " + response.statusText + "\n" + errorMessage);
               }

           }, error => {
               this.isFetching = false;
               

               this.toaster.pop('error', 'API Service Error', "Status code:" + error.status + " error: " + error.statusText);
           });

   }
}
