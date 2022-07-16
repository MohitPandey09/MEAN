import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillingDetailsComponent } from './modules/billing-details/billing-details.component';
import { CartComponent } from './modules/cart/cart.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { FavouriteComponent } from './modules/favourite/favourite.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { AuthGuard } from './shared/guards/auth.guard';

const appRoutes: Routes = [
    // {
    //     path: 'admin',
    //     loadChildren: './admin-layout/admin-layout.module#AdminLayoutModule'
    // },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegistrationComponent
    },
    {
        path: 'home',
        canActivate: [AuthGuard],
        component: HomeComponent
    },
    {
        path: 'favourite',
        canActivate: [AuthGuard],
        component: FavouriteComponent
    },
    {
        path: 'cart',
        canActivate: [AuthGuard],
        component: CartComponent
    },
    {
        path: 'billing-details',
        canActivate: [AuthGuard],
        component: BillingDetailsComponent
    },
    {
        path: 'checkout',
        canActivate: [AuthGuard],
        component: CheckoutComponent
    },
    {
        path: 'product',
        loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)
    },
    {
        path: '**',
        redirectTo: '/login' 
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
