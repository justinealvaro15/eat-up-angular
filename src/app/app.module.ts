import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { routing } from './app-routing.module';
import { NgSelect2Module } from 'ng-select2';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    UserModule,
    AdminModule,
    NgSelect2Module,
    LeafletModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
