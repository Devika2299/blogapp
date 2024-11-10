

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  postForm: FormGroup;
  selectedFile: File | null = null;
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      file: [null],
      image: [null]
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onImageChange(event: any) {
    this.selectedImage = event.target.files[0];
  }

  createPost() {
    if (this.postForm.invalid || !this.selectedFile || !this.selectedImage) {
      this.postForm.markAllAsTouched(); 
      return;
    }

    const formData = new FormData();
    const userId = this.authService.getUserId();

    if (!userId) {
      console.error('User ID not found. Cannot create post.');
      return;
    }

    formData.append('title', this.postForm.value.title);
    formData.append('content', this.postForm.value.content);
    formData.append('user_id', userId);
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('image', this.selectedImage, this.selectedImage.name);

    this.apiService.createPostWithFiles(formData).subscribe({
      next: (result) => {
        console.log('Result from API:', result);
        if (result.success) {
          alert('Blog post created successfully!'); // Success alert
          this.router.navigate(['/home']);
        } else {
          console.error('Error:', result.message);
          alert('Error creating post: ' + result.message); // Error alert
        }
      },
      error: (error) => {
        console.error('Error creating post:', error);
        alert('An unexpected error occurred while creating the post.'); // General error alert
      }
    });
  }
}
