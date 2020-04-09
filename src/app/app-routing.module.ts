import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntityListComponent } from './modules/pages';


const routes: Routes = [
  {
    path: 'entity/list',
    component: EntityListComponent
  },
  {
    path: '**',
    redirectTo: 'entity/list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
