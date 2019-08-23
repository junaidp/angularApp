import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { stringify } from "@angular/core/src/util";

@Injectable({providedIn: 'root'})
export class PostsService{
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient){}

    getPosts(){
        this.http.get<{message: string, posts:Post[]}>('http://localhost:3000/api/posts')
        .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
        });
       // return this.posts;
      //  return [...this.posts]; // creates a new array , get data form older array and put in new array
    }

    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content:string){
        const post: Post = {_id: null, title: title, content: content};
        this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
        .subscribe((responseData)=>{
          // const id = responseData.postId;
        })
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
    }

    deletePost(postId: string){
        this.http.delete('http://localhost:3000/api/posts/' + postId)
        .subscribe(() => {
            console.log('deleted');
            const updatedPosts = this.posts.filter(post => post._id !== postId);
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    }
}