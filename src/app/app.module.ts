import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {Chips} from './chips/chips.component';
import { DoubleSlider } from './doubleslider/doubleslider.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from '../material-module';

@NgModule({
  declarations: [
    AppComponent,
    Chips,
    DoubleSlider
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
