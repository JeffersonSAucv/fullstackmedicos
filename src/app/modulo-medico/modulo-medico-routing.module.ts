import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteListComponent } from './pacientes/pacientes-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'listado', pathMatch: 'full' },
  { path: 'listado', component: PacienteListComponent },
//   { path: 'historial', component: HistorialComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuloMedicoRoutingModule {}
