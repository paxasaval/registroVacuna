import { RegistroComponent } from './registro/registro.component';
import { RegistroFormComponent } from './registro-form/registro-form.component';
import { RegistroVacunaComponent } from './registro-vacuna/registro-vacuna.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'buscar_paciente',
    component: RegistroVacunaComponent,
  },
  {
    path:'registro_form',
    component: RegistroFormComponent,
  },
  {
    path:'consulta',
    component: RegistroComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
