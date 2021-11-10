import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './modules/registration/registration.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './shared/services/token-interceptor.service';
import { OwlModule } from 'ngx-owl-carousel';
import { LayoutModule } from './modules/layout/layout.module';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegistrationComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        OwlModule,
        LayoutModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
