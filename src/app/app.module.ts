import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './interceptors/auth.interceptor';

import { AppComponent } from './app.component';
import { AdvertisementListComponent } from './pages/advertisements/list/list.component';
import { AdvertisementNewComponent } from './pages/advertisements/new/new.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { AdvertisementEditComponent } from './pages/advertisements/edit/edit.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

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
