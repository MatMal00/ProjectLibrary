import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './modules/home/home.component';
import { RentalComponent } from './modules/rental/rental.component';
import { ShopComponent } from './modules/shop/shop.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { CreateNewAccountComponent } from './modules/authentication/create-new-account/create-new-account.component';
import { AdminComponent } from './modules/admin/admin.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ShoppingBasketComponent } from './modules/basket/shopping-basket/shopping-basket.component';
import { OrderStepperComponent } from './modules/basket/order-stepper-payment/order-stepper.component';
import { MatStepperModule } from '@angular/material/stepper';
import { OrderStepperRentComponent } from './modules/basket/order-stepper-rent/order-stepper-rent.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RentalComponent,
    ShopComponent,
    LoginComponent,
    CreateNewAccountComponent,
    AdminComponent,
    ShoppingBasketComponent,
    OrderStepperComponent,
    OrderStepperRentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    HomeComponent,
    RentalComponent,
    ShopComponent,
    LoginComponent,
    CreateNewAccountComponent,
    AdminComponent,
    OrderStepperComponent,
    OrderStepperRentComponent,
  ],
})
export class AppModule {}
