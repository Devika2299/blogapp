import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit{
  posts: any[] = [];
  
  postId: string = '';
  postData = {
    title: '',
    content: ''
  };
 
  constructor(private apiservices: ApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id')!;
    this.loadPosts();
  }

  loadPosts(): void {
    this.apiservices.getPostById(this.postId).subscribe({
      next: (result) => {
        if (result.success) {
          this.postData = result.data; 
        } else {
          console.error('Post not found');
          alert('Post not found!');
        }
      },
      error: (error) => {
        console.error('Error fetching post:', error);
        alert('Error fetching post!');
        this.router.navigate(['/home']);  
      }
    });
  }

  updatePost() {
    this.apiservices.updatePost(this.postId, this.postData).subscribe({
      next: (result) => {
        if (result.success) {
          this.router.navigate(['/home']);
        } else {
          console.error('Error updating post:', result.message);
          alert('Error updating post!');
        }
      },
      error: (error) => {
        console.error('Error updating post:', error);
        alert('Error updating post!');
      }
    });
  }

  deletePost(): void {  
    if (confirm('Are you sure you want to delete this post?')) {
      this.apiservices.deletePost(this.postId).subscribe({
        next: () => {
          alert('Post deleted successfully!');
          this.router.navigate(['/home']);  
        },
        error: (error) => {
          console.error('Error deleting post:', error);
          alert('Error deleting post!');
        }
      });
    }
  }
}
