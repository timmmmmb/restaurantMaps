import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {Chips} from './chips/chips.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from '../material-module';
import { DoubleSlider } from './doubleslider/doubleslider.component';

import { MatSlidefModule } from '../../slidef';

@NgModule({
  declarations: [
    AppComponent,
    Chips,
    DoubleSlider
  ],
  imports: [
    MatSlidefModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
