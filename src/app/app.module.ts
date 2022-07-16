import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AdvertisementListComponent } from './advertisement-list/advertisement-list.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { AdvertisementNewComponent } from './advertisement-new/advertisement-new.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AdvertisementListComponent,
    AdvertisementComponent,
    AdvertisementNewComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'advertisements', component: AdvertisementListComponent},
      {path: 'advertisements/new', component: AdvertisementNewComponent},
      {path: 'advertisements/:id', component: AdvertisementComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
