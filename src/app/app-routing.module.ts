import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component'; 
import { MenuAdminComponent } from './componentes/menu-admin/menu-admin.component';
import {NquestionsComponent} from './componentes/nquestions/nquestions.component';
import { EditQuestionComponent } from './componentes/edit-question/edit-question.component';

const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo:'login_sistema'},
  {path: 'login_sistema', component:LoginComponent},
  {path: 'menu_admin', component:MenuAdminComponent},
  {path: 'nquestion', component:NquestionsComponent},
  {path: 'equestion/:id', component:EditQuestionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
