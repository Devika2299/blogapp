

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  users: any[] = [];
  currentUserId: number | null = null;

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit() {
  
    this.currentUserId = Number(localStorage.getItem('userId'));  
    this.loadUsers();
  }

  loadUsers() {
    this.apiService.getUsers().subscribe(
      (data: any[]) => {
      
        this.users = data.filter(user => user.id !== this.currentUserId);

        this.users.forEach(user => {
          user.isFollowed = this.authService.isUserFollowed(user.id);  
        });
      },
      (error: any) => {
        console.error('Error fetching users', error);
      }
    );
  }

  toggleFollow(user: any) {
    if (this.currentUserId === null) {
      alert('You need to log in first.');
      return;
    }

    
    if (user.isFollowed) {
      this.unfollowUser(user.id, this.currentUserId, () => {
        alert(`You unfollowed ${user.name} successfully.`);
      });
    } else {
      this.followUser(user.id, this.currentUserId, () => {
        alert(`You followed ${user.name} successfully.`);
      });
    }
    user.isFollowed = !user.isFollowed;  
  }

  followUser(userId: number, followerId: number, onSuccess: () => void) {
    this.apiService.followUser(userId, followerId).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.authService.followUser(userId);  
          onSuccess();  
        } else {
          alert(response.message);
        }
      },
      (error: any) => {
        console.error('Error following user:', error);
        alert('An error occurred while following the user.');
      }
    );
  }

  unfollowUser(userId: number, followerId: number, onSuccess: () => void) {
    this.apiService.unfollowUser(userId, followerId).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.authService.unfollowUser(userId);  
          onSuccess();  
        } else {
          alert(response.message);  
        }
      },
      (error: any) => {
        console.error('Error unfollowing user:', error);
        alert('An error occurred while unfollowing the user.');
      }
    );
  }
}
