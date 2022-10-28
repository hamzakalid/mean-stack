import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './Auth/auth.interceptor';
import { LoginComponent } from './Auth/login/login.component';
import { SinupComponent } from './Auth/sinup/sinup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { PostEditorComponent } from './Posts/post-editor/post-editor.component';
import { SidebarComponent } from './components/posts/sidebar/sidebar.component';
import { PostsListComponent } from './Posts/posts-list/posts-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListOfPostsComponent } from './components/posts/list-of-posts/list-of-posts.component';
import { PostComponent } from './Posts/post/post.component';
import { ProfileComponent } from './Auth/profile/profile.component';


@NgModule({
  declarations: [

    AppComponent,
    LoginComponent,
    SinupComponent,
    NavbarComponent,
    PostEditorComponent,
    PostsListComponent,
    SidebarComponent,
    ListOfPostsComponent,
    PostComponent,
    ProfileComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FroalaViewModule,
    FroalaEditorModule,
    FontAwesomeModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
