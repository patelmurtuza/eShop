import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    ProductComponent,
    OrderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [{ provide: 'ORIGIN_URL', useValue: location.origin }],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
