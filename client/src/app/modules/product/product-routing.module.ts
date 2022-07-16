import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';

const routes: Routes = [
    {
        path: 'category/:id',
        canActivate: [AuthGuard],
        component: ProductCategoriesComponent
    },
    {
        path: 'list/:id',
        canActivate: [AuthGuard],
        component: ProductListComponent
    },
    {
        path: 'details/:id',
        canActivate: [AuthGuard],
        component: ProductDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }
