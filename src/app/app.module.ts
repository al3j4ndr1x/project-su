import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { NbThemeModule, NbSidebarModule, NbLayoutModule, NbButtonModule, NbInputModule, NbCardModule, } from '@nebular/theme';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // this will enable the default theme, you can change this by passing 
    // `{ name: 'dark' }` to enable the dark theme
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    NbInputModule,
    NbCardModule,    
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
