import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudApiDosComponent } from './dashboard/crud-api-dos/crud-api-dos.component';
import { ListaPersonalComponent } from './dashboard/lista-personal/lista-personal.component';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        data: { roles: ['dashboard_access'], preload: false}
      },
      {path: 'crudapidos', component:CrudApiDosComponent},
      {path: 'listap', component:ListaPersonalComponent},
      {
        path: "**",
        redirectTo: "dashboard",
        pathMatch: "full"
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
