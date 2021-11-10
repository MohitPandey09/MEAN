import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { AuthGuard } from './shared/guards/auth.guard';

const appRoutes: Routes = [
    // {
    //     path: 'admin',
    //     loadChildren: './admin-layout/admin-layout.module#AdminLayoutModule'
    // }
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
        path: 'product',
        loadChildren: './modules/product/product.module#ProductModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
