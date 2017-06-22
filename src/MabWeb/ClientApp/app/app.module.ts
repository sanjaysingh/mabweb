import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { SharedModule } from './components/shared/shared.module';
import { MockApiService } from './components/mockapi/mockapi.service';
import { effects, store, instrumentation } from './components/store';
import { routing } from './app.router';
//import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { MarkdownModule } from 'angular2-markdown';
import { AceEditorModule } from 'ng2-ace-editor';

@NgModule({
    declarations: [
        AppComponent,ListComponent, AddComponent
    ],
    imports: [
        UniversalModule,// Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        SharedModule,
        FormsModule,
        store,
        effects,
        routing,
        instrumentation,
        ReactiveFormsModule,
        RecaptchaModule.forRoot(),
        RecaptchaFormsModule,
        ToasterModule,
        MarkdownModule.forRoot(),
        AceEditorModule
    ],
    providers: [
        MockApiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
