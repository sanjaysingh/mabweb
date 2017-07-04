import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { MockApiComponent } from './mockapi.component';
import { routing } from './mockapi.router';
import { SharedModule } from '../shared/shared.module';
import { MockApiService } from './mockapi.service';

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
  ],
  bootstrap: [
    MockApiComponent
  ],
  providers: [
      MockApiService
  ],
})
export class MockApiModule {}
