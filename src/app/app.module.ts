import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { NavmenuComponent } from '../common/navmenu/navmenu.component';
import {
  MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
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
    LoginComponent,
    NavmenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule,
    Ng4LoadingSpinnerModule.forRoot(),
    ToastNotificationsModule.forRoot(),
    AngularSplitModule.forRoot(),
    FlexLayoutModule
  ],
  providers: [{ provide: 'ORIGIN_URL', useValue: location.origin }],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
