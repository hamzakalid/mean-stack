import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '../post.module';
import { PostService } from '../post.service';
import { faThumbsUp,faComment,faEye, faThumbsDown, faShare} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {


  icons = {
    faLike : faThumbsUp,
    faComment: faComment,
    faEye: faEye,
    faDisLike : faThumbsDown,
    faShare:faShare,
  }

  constructor(private postService:PostService,private router:ActivatedRoute) { }

  public post:Post={
    _id:'',
    title:'',
    content:'',
    description:'',
    user:'',
    date:new Date()
  }


  ngOnInit(): void {

   let id:string;

   this.router.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('id')){
        id=""+paramMap.get('id');
        this.post= {...this.postService.getPost(id)[0]};
      }else{
        console.log('no id');
      }
   });

  }

}
