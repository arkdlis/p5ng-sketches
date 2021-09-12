import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { S001Component } from './sketches/s001.component';
import { S002Component } from './sketches/s002.component';
import { S003Component } from './sketches/s003.component';
import { S004Component } from './sketches/s004.component';
import { S005Component } from './sketches/s005.component';

export const sketches: any = [
  {
    name: '001 Noise',
    path: 's001',
    component: S001Component,
  },
  {
    name: '002 Blackhole',
    path: 's002',
    component: S002Component,
  },
  {
    name: '003 House of Leaves',
    path: 's003',
    component: S003Component,
  },
  {
    name: '004 Symmetry',
    path: 's004',
    component: S004Component,
  },
  {
    name: '005 Moon',
    path: 's005',
    component: S005Component,
  },
];

const routes: Routes = [
  ...sketches,
  { path: '', redirectTo: '/s001', pathMatch: 'full' },
  { path: '**', component: S001Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
