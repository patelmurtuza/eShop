import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { AngularSplitModule } from 'angular-split';
import 'hammerjs';

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
    MaterialModule,
    Ng4LoadingSpinnerModule.forRoot(),
    ToastNotificationsModule.forRoot(),
    AngularSplitModule.forRoot()
  ],
  providers: [{ provide: 'ORIGIN_URL', useValue: location.origin }],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
