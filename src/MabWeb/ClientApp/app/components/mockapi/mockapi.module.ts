import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { MockApiComponent } from './mockapi.component';
import { routing } from './mockapi.router';
//import { EditComponent } from './edit/edit.component';
import { SharedModule } from '../shared/shared.module';
//import { AddComponent } from './add/add.component';
import { MockApiService } from './mockapi.service';
//import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule
  ],
  declarations: [
    MockApiComponent,
     //EditComponent,
     // AddComponent,
    //ListComponent
  ],
  bootstrap: [
    MockApiComponent
  ],
  providers: [
      MockApiService
  ],
})
export class MockApiModule {}
