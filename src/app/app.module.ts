import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormViewerComponent } from './components/form-viewer/form-viewer.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './shared/material.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormBuilderComponent,
    FormViewerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DragDropModule,
    MaterialModule
  ],
  providers: [AuthService, AuthGuard, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
