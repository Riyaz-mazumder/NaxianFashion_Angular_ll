import { ShoptinCartComponent } from './common/shoptin-cart/shoptin-cart.component';
import { ProductViewPageComponent } from './Pages/product-view-page/product-view-page.component';
import { AllProductsComponent } from './admin/Tables/Product/all-products/all-products.component';
import { AddNewProductComponent } from './admin/Tables/Product/add-new-product/add-new-product.component';
import { AdminLoginComponent } from './admin/Pages/admin-login/admin-login.component';
import { AdminHomePageComponent } from './admin/Pages/admin-home-page/admin-home-page.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { AppComponent } from './app.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { SignUpComponent } from './Pages/sign-up/sign-up.component';
import { LogInComponent } from './Pages/log-in/log-in.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageMainComponent } from './admin/Pages/home-page-main/home-page-main.component';

import { AproveOrderComponent } from './admin/Tables/order/aprove-order/aprove-order.component';
import { AllUserComponent } from './admin/Tables/users/all-user/all-user.component';
import { ShowOrderComponent } from './admin/Tables/order/show-order/show-order.component';
import { AllProductBySearchedComponent } from './Pages/all-product-by-searched/all-product-by-searched.component';
import { UserDetailsComponent } from './Pages/user-details/user-details.component';
import { TryOnSunglassComponent } from './Pages/try-on-sunglass/try-on-sunglass.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { TrackMyOrderDetailsComponent } from './Pages/track-my-order-details/track-my-order-details.component';
import { TrackMyOrderComponent } from './Pages/track-my-order/track-my-order.component';
import { TrakcByAdminComponent } from './admin/Pages/trakc-by-admin/trakc-by-admin.component';
import { TrackingDetailsComponent } from './admin/tracking-details/tracking-details.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LogInComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'productView/:id', component: ProductViewPageComponent },
  { path: 'user/:id/shopingView', component: ShoptinCartComponent },
  { path: 'search/:word', component: AllProductBySearchedComponent},
  { path: 'tryOn/glessId/:id', component: TryOnSunglassComponent},
  { path: 'term', component: TermsAndConditionComponent},
  { path: 'userPropile/:id', component: UserDetailsComponent},
  { path: 'trackOrder', component: TrackMyOrderComponent},
  { path: 'trackOrder/details/:id', component: TrackMyOrderDetailsComponent},

  { path: 'admin', component: AdminLoginComponent },
  {
    path: 'admin/dashbord',
    component: AdminHomePageComponent,

    children: [
      { path: '', component: HomePageMainComponent },
      { path: 'addNewProduct', component: AddNewProductComponent },
      { path: 'allProducts', component: AllProductsComponent },
      { path: 'approveOrders', component: AproveOrderComponent },
      { path: 'showAllOrders', component: ShowOrderComponent },
      { path: 'allUser', component: AllUserComponent },
      { path: 'approveOrder/tracking/:id', component: TrakcByAdminComponent },
      { path: 'trackingDetails/:id', component: TrackingDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
