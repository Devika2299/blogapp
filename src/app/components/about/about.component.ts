import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{

  post: any; 

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
  }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.loadPost(postId);
    }
  }

  loadPost(id: string) { 
    this.apiService.getPostById(id).subscribe({
      next: (result) => {
        if (result.success) {
          this.post = result.data; 
        } else {
          console.error('Post not found');
        }
      },
      error: (error) => {
        console.error('Error fetching post:', error);
      }
    });
  }
}