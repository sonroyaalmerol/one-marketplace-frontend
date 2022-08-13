import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './interceptors/auth.interceptor';

import { AppComponent } from './app.component';
import { AdvertisementNewComponent } from './pages/advertisements/new/new.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { AdvertisementEditComponent } from './pages/advertisements/edit/edit.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavBarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdvertisementCategoryComponent } from './pages/advertisements/category/category.component';
import { AdvertisementSearchComponent } from './pages/advertisements/search/search.component';
import { AdvertisementEntryComponent } from './pages/advertisements/entry/entry.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    AdvertisementNewComponent,
    AdvertisementEditComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'advertisements/search', component: AdvertisementSearchComponent},
      {path: 'advertisements/new', component: AdvertisementNewComponent},
      {path: 'advertisements/:id', component: AdvertisementEntryComponent},
      {path: 'advertisements/:id/edit', component: AdvertisementEditComponent},
      {path: 'profiles/:id', component: ProfileComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'categories/:id', component: AdvertisementCategoryComponent}
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
