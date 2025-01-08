import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './layouts/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,  
    children: [ 
      {
        path: '', 
        canActivate : [],
        component : HomeComponent, 
      },
      {
        path: 'detail-product', 
        canActivate : [],
        component : HomeComponent, 
      },
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
