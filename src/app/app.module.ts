import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  NgbModal,
  NgbModule,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PaymentItemComponent } from './payment-detail/payment-item/payment-item.component';
import { PaymentFormComponent } from './payment-detail/payment-form/payment-form.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpInterceptorInterceptor } from './http-interceptor.interceptor';
import { AboutComponent } from './about/about.component';
@NgModule({
  declarations: [
    AppComponent,
    PaymentDetailComponent,
    PaymentItemComponent,
    PaymentFormComponent,
    LoginComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorInterceptor,
      multi: true,
    },
    NgbActiveModal,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
