import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import { componentFactoryName } from "@angular/compiler";
import {Post} from '../post.model';
import { PostsService } from "../post.service";
import { Subscription } from "rxjs";
@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export  class PostListComponent implements OnInit, OnDestroy{
    ngOnInit(){
      this.postsService.getPosts();

       this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
            this.posts = posts;
       });
    } 

    onDelete(postId: string){
        this.postsService.deletePost(postId);
    }

    ngOnDestroy(){

        this.PostssSub.unsubscribe();
        
    }
    // posts= [
    //     {title:'First Post', content:'This first'},
    //     {title:'sec Post', content:'This sec'},
    //     {title:'th Post', content:'This th'}
    // ];

   posts: Post[]=[];
   private postsSub: Subscription;
 private PostssSub: Subscription;
    constructor(public postsService: PostsService){} // this public will create a new variable postsService in this class 
    //and put the parameter in that. 
}