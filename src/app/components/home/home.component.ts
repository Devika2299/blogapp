


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

interface Post {
  id: number;
  title: string;
  content: string;
  user_id: number;
  file_path?: string;
  image_path?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  userId: string = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.userId = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    const currentUserId = +this.userId; 
    this.apiService.getPostsByFollowedUsers(currentUserId).subscribe({
      next: (result) => {
        if (result.success) {
          this.posts = result.data;
        } else {
          console.error('No posts found');
        }
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }


//   downloadFile(filePath: string): void {
//     if (!filePath) {
//         console.error('No file path provided');
//         return;
//     }
    
//     const downloadUrl = `http://localhost/dbapp_apiphp/dbapp_api/download.php?file=${encodeURIComponent(filePath)}`;
    
//     this.http.get(downloadUrl, { responseType: 'blob', withCredentials: true }).subscribe({
//         next: (blob) => {
//             if (blob.size === 0) {
//                 console.error('Received empty file');
//                 alert('The file could not be downloaded.');
//                 return;
//             }

//             const url = window.URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.href = url;
//             a.download = filePath.split('/').pop() || 'downloaded_file';
//             document.body.appendChild(a); 
//             a.click();
//             document.body.removeChild(a);
//             window.URL.revokeObjectURL(url); 
//         },
//         error: (error) => {
//             console.error('Download error:', error);
//             alert('An error occurred while downloading the file. Please try again.');
//         }
//     });
// }


downloadFile(filePath: string): void {
  if (!filePath) {
      console.error('No file path provided');
      return;
  }

  const downloadUrl = `http://localhost/dbapp_apiphp/dbapp_api/download.php?file=${encodeURIComponent(filePath)}`;

  this.http.get(downloadUrl, { responseType: 'blob', withCredentials: true }).subscribe({
      next: (blob) => {
          if (blob.size === 0) {
              console.error('Received empty file');
              alert('The file could not be downloaded.');
              return;
          }

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filePath.split('/').pop() || 'downloaded_file';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
      },
      error: (error) => {
          console.error('Download error:', error);
          if (error.status === 403) {
              alert('Unauthorized access. Please log in.');
          } else if (error.status === 404) {
              alert('File not found.');
          } else {
              alert('An error occurred while downloading the file. Please try again.');
          }
      }
  });
}



  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
