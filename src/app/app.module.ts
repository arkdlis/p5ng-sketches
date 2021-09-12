import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { S001Component } from './sketches/s001.component';
import { S002Component } from './sketches/s002.component';
import { S003Component } from './sketches/s003.component';
import { S004Component } from './sketches/s004.component';
import { S005Component } from './sketches/s005.component';

@NgModule({
  declarations: [
    AppComponent,
    S001Component,
    S002Component,
    S003Component,
    S004Component,
    S005Component,
  ],
  imports: [
    BrowserModule,
    MatListModule,
    MatSidenavModule,
    AppRoutingModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
