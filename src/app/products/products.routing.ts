import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AuthGuardService } from '../guards/auth-guard.service';

// Const Routes
const routes: Routes = [
    {path: '', component: ProductListComponent, canActivate : [AuthGuardService]},
    {path: 'product-list', component : ProductListComponent, canActivate : [AuthGuardService]},
    {path: ':id', component : ProductDetailsComponent, canActivate : [AuthGuardService]},
    // {path: '', component: ProductListComponent},
    // {path: 'product-list', component : ProductListComponent},
    // {path: ':id', component : ProductDetailsComponent},

    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],


})
export class ProductsRoutingModule { }

