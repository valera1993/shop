import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ShopComponent } from './shop/shop.component';
import { BasketComponent } from './basket/basket.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { SingleProductComponent } from './single-product/single-product.component';



const routes: Routes = [
  {path: '', component: ShopComponent},
  {path: 'cart', component: CartComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'admin', component: AdminPanelComponent},
  {path: 'admin/info', component: SingleProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
