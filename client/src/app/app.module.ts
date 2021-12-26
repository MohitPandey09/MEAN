import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { CartComponent } from './modules/cart/cart.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './modules/registration/registration.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './shared/services/token-interceptor.service';
import { LayoutModule } from './modules/layout/layout.module';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegistrationComponent,
        HomeComponent,
        CartComponent,
        CheckoutComponent,
    ],
    imports: [  
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        LayoutModule,
        NgxStripeModule.forRoot('pk_test_51K6eY1SHrrqQXcLUV34MnRSm3Tle5JPebsqYxENVm5k5rfJoN9U6HVOMdvmCP1KM1nLPqoHyXkwfpGMgx3Bje4Lg00YPp5xfq0')
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
