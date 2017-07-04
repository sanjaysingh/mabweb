import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { RouterModule } from '@angular/router';
import { SubNavigationComponent } from './sub-navigation/sub-navigation.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    TopNavigationComponent,
    SubNavigationComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TopNavigationComponent,
    LoaderComponent,
    SubNavigationComponent,
  ]
})
export class SharedModule {}
