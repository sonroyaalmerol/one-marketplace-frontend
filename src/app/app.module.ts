import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './interceptors/auth.interceptor';

import { AppComponent } from './app.component';
import { AdvertisementListComponent } from './advertisement-list/advertisement-list.component';
import { AdvertisementNewComponent } from './advertisement-new/advertisement-new.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { AdvertisementEditComponent } from './advertisement-edit/advertisement-edit.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    AdvertisementListComponent,
    AdvertisementNewComponent,
    HomeComponent,
    AdvertisementEditComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'advertisements', component: AdvertisementListComponent},
      {path: 'advertisements/new', component: AdvertisementNewComponent},
      {path: 'advertisements/:id', component: AdvertisementEditComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
