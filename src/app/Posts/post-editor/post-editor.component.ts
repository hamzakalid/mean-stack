import { Component, OnInit } from '@angular/core';

import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/paragraph_style.min.js";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/quick_insert.min.js";
import "froala-editor/js/plugins/table.min.js";
import "froala-editor/js/plugins/video.min.js";
import "froala-editor/js/plugins/url.min.js";
import "froala-editor/js/plugins/quote.min.js";
import "froala-editor/js/plugins/emoticons.min.js";
import "froala-editor/js/plugins/code_beautifier.min.js";
import "froala-editor/js/plugins/inline_style.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/image_manager.min.js";
import "froala-editor/js/third_party/image_tui.min.js";


import "froala-editor/css/plugins/image.min.css";
import "froala-editor/css/third_party/image_tui.min.css";
import "froala-editor/css/plugins/quick_insert.min.css";
import "froala-editor/css/plugins/table.min.css";
import "froala-editor/css/plugins/video.min.css";
import "froala-editor/css/plugins/emoticons.min.css";
import "froala-editor/css/plugins/colors.min.css";
import "froala-editor/css/plugins/image_manager.min.css";
import "froala-editor/css/third_party/image_tui.min.css";

import { PostService } from '../post.service';
import { Post } from '../post.module';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit {

  public content: string = "";
  public title:string = '';
  public description:string = '';
  image = "";//"htp://localhost:3t000/images/3dd5cf5107cc819d3ae73d5f6d18afcd02e7ba1c.jpg";



  ngOnInit(): void {

  }

  constructor(private postService:PostService){}

  public options: Object = {
    charCounterCount: true,
    toolbarInline: true,
    toolbarVisibleWithoutSelection: true,
    angularIgnoreAttrs: ['style', 'ng-reflect-froala-editor', 'ng-reflect-froala-model'],
    imageUploadURL: 'http://localhost:3000/api/posts/image_upload',

  };



  onPostCreate(){

    this.postService.createPost(this.title,this.description,this.content,'Hamza Khaled',new Date());

  }


  featchPosts(){
    this.postService.getPosts();
  }
}
