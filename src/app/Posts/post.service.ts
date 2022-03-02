import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Post } from "./post.module";

@Injectable({providedIn:"root"})

export class PostService{

  constructor(private http:HttpClient,private router:Router){}

    private posts :Post[]=[];
    private postUpdate = new Subject<{post:Post[],count:string}>();


    getPostUpdatedListenr(){
      return this.postUpdate.asObservable();
    }

    createPost(title:string,description:string,content:string,user:string,date:Date){

      const post:Post = {
        _id:'',
        title:title,
        description:description,
        content:content,
        user:user,
        date:date
      }



      this.http.post("http://localhost:3000/api/posts",post)
      .subscribe(res=>{
        console.log('res='+res);
        this.router.navigateByUrl('/');
      });

  }



  getPosts(){
    //returns all the posts
    this.http.get<{message:string,posts:Post[],count:string}>("http://localhost:3000/api/posts")
    .subscribe(res=>{
      this.posts = res.posts;
      this.postUpdate.next({post: [...this.posts],count:res.count});
   });

  }

  getPost(id:string){
    return {...this.posts.filter(post=> post._id==id)};
  }


}
