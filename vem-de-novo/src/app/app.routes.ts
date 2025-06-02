import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { authGuard } from './core/auth/auth.guard';
import { ProductListComponent } from './pages/admin/products/product-list/product-list.component';
import { ProductFormComponent } from './pages/admin/products/product-form/product-form.component';
import { ProductsPageComponent } from './pages/products/products-page/products-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin/login', component: LoginComponent },
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/products',
    component: ProductListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/products/edit/:id',
    component: ProductFormComponent,
    canActivate: [authGuard]
  },
  { path: 'produtos/:category', component: ProductsPageComponent },
  { path: '**', redirectTo: '' }
];
