import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { ProfileComponent } from './Auth/profile/profile.component';
import { SinupComponent } from './Auth/sinup/sinup.component';
import { PostEditorComponent } from './Posts/post-editor/post-editor.component';
import { PostComponent } from './Posts/post/post.component';
import { PostsListComponent } from './Posts/posts-list/posts-list.component';


const routes: Routes = [

  //auth
  { path: 'log-in', component: LoginComponent },
  { path: 'sin-up', component: SinupComponent },
  { path: 'create', component: PostEditorComponent },
  { path: 'posts', component: PostsListComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'post/:id', component: PostComponent },

  { path: '', redirectTo: '/posts', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
