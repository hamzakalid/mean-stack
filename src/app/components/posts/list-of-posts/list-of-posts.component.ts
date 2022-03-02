import { Component, OnInit } from '@angular/core';
import { faThumbsUp,faComment,faEye} from '@fortawesome/free-solid-svg-icons';
import { Post } from 'src/app/Posts/post.module';
import { PostService } from 'src/app/Posts/post.service';

@Component({
  selector: 'app-list-of-posts',
  templateUrl: './list-of-posts.component.html',
  styleUrls: ['./list-of-posts.component.css']
})
export class ListOfPostsComponent implements OnInit {

  constructor(private postService:PostService) { }


  icons = {
    faLike : faThumbsUp,
    faComment: faComment,
    faEye: faEye,
  }

  posts:Post[]=[];
  length:number=0;
  // posts = [
  //   {
  //     id: 1,
  //     title: 'This is the post title maybe contain alot of letters or not it just a title 1',
  //     description: 'Fun fact. Laracasts originally launched back in 2013 as a collection of isolated video tutorials. One video, one technique, move on to something else. There wasn’t yet any concept of a series or course. But not long after the launch, I ran into ',
  //     likes: 20,
  //     comments:20,
  //     views:20,
  //     user : 'John Doe',
  //     date: new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
  //     image: 'https://picsum.photos/id/727/200/200'
  //   },
  //   {
  //     id: 2,
  //     title: 'This is the post title maybe contain alot of letters or not it just a title 2',
  //     description: 'Fun fact. Laracasts originally launched back in 2013 as a collection of isolated video tutorials. One video, one technique, move on to something else. There wasn’t yet any concept of a series or course. But not long after the launch, I ran into ',
  //     likes: '20',
  //     comments:'26',
  //     views:'2h',
  //     user : 'John Doe',
  //     date: new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
  //     image: 'https://picsum.photos/id/797/200/200'
  //   },
  //   {
  //     id: 3,
  //     title:  'This is the post title maybe contain alot of letters or not it just a title 3',
  //     description: 'Fun fact. Laracasts originally launched back in 2013 as a collection of isolated video tutorials. One video, one technique, move on to something else. There wasn’t yet any concept of a series or course. But not long after the launch, I ran into ',
  //     likes: '25',
  //     comments:'24',
  //     views:'5.5h',
  //     user : 'John Doe',
  //     date: new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
  //     image: 'https://picsum.photos/id/999/200/200'
  //   }

  // ]
  ngOnInit(): void {

    this.postService.getPosts();
    this.postService.getPostUpdatedListenr().
      subscribe((result)=>{
        this.posts = result.post;
        this.length = +result.count;
      })

  }

}
