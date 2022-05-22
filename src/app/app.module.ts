import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MenuAdminComponent } from './componentes/menu-admin/menu-admin.component';
import { MenuUsuComponent } from './componentes/menu-usu/menu-usu.component';
import { NquestionsComponent } from './componentes/nquestions/nquestions.component';
import { MenuadminComponent } from './componentes/menuadmin/menuadmin.component';
import { NavegacionComponent } from './componentes/navegacion/navegacion.component';
import { EditQuestionComponent } from './componentes/edit-question/edit-question.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuAdminComponent,
    MenuUsuComponent,
    NquestionsComponent,
    MenuadminComponent,
    NavegacionComponent,
    EditQuestionComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
