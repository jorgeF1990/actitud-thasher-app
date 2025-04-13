// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app.routes';
// Removed duplicate import of AppComponent

// Componentes propios
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
// Aquí puedes importar más componentes según los tengas

@NgModule({
  declarations: [

    // otros componentes...
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,


   
  ],
  providers: [],
    // Aquí se bootstrappea el AppComponent
  // Removed bootstrap array as AppComponent is standalone
})
export class AppModule { }
