import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { SinupComponent } from './Auth/sinup/sinup.component';


const routes: Routes = [

  //auth
  { path: 'log-in', component: LoginComponent },
  { path: 'sin-up', component: SinupComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
