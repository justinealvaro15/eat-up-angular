import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { routing } from './app-routing.module';
import { NgSelect2Module } from 'ng-select2';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AuthServiceConfig, GoogleLoginProvider, LoginOpt } from 'angularx-social-login';
import { LoadingService } from './loading.service';
import { MatProgressSpinnerModule } from '@angular/material';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingHttpInterceptorService } from './loading-http-interceptor.service';
// import { AuthService } from 'angularx-social-login';


const googleLoginOptions: LoginOpt = {
  client_id: "305506356766-0q3pes92ks9buimmcchbtek02f3an0oc",
  scope: 'profile email',
  hosted_domain: 'up.edu.ph'
}; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig



const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("305506356766-0q3pes92ks9buimmcchbtek02f3an0oc", googleLoginOptions)
  }
]);
 
export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    routing,
    UserModule,
    AdminModule,
    NgSelect2Module,
    MatProgressSpinnerModule,
    LeafletModule.forRoot()
    // AuthService.for
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }, LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
