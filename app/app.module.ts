import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainFrameComponent } from './main-frame/main-frame.component';
import { ChoiceMenuComponent } from './main-frame/choice-menu/choice-menu.component';
import { OptionsMenuComponent } from './main-frame/options-menu/options-menu.component';
import { AnyBankPaymentComponent } from './main-frame/any-bank-payment/any-bank-payment.component';
import { SelfBankPaymentComponent } from './main-frame/self-bank-payment/self-bank-payment.component';
import { RequestPaymentComponent } from './main-frame/request-payment/request-payment.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { ProductComponent } from './company-info/product/product.component';
import { FooterComponent } from './footer/footer.component';
import { PayCompleteComponent } from './main-frame/pay-complete/pay-complete.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminCardpayComponent } from './admin-panel/admin-cardpay/admin-cardpay.component';
import { AdminReqpayComponent } from './admin-panel/admin-reqpay/admin-reqpay.component';
import { SiteComponent } from './site/site.component';
import { LoginComponent } from './login/login.component'
import { AuthenticationService } from './_services/authentication.service';
import { AdminGuard } from './_guards/admin.guard';

const appRoutes: Routes = [
  { path: "admin", component: AdminPanelComponent, canActivate: [AdminGuard] },
  { path: "login", component: LoginComponent },
  { path: "", component: SiteComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainFrameComponent,
    ChoiceMenuComponent,
    OptionsMenuComponent,
    AnyBankPaymentComponent,
    SelfBankPaymentComponent,
    RequestPaymentComponent,
    CompanyInfoComponent,
    ProductComponent,
    FooterComponent,
    PayCompleteComponent,
    AdminPanelComponent,
    AdminCardpayComponent,
    AdminReqpayComponent,
    SiteComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpModule,
    HttpClientModule
  ],
  providers: [ 
    AuthenticationService,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
