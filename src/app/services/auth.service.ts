


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false; 
  private userId: string = "";  
  private username: string = "";  
  private followedUsers: Set<number> = new Set();

  constructor() {
  
    const followedUsers = localStorage.getItem('followedUsers');
    if (followedUsers) {
      this.followedUsers = new Set<number>(JSON.parse(followedUsers));
    }
  
    this.userId = localStorage.getItem('userId') || '';
    this.username = localStorage.getItem('username') || '';
    this.isLoggedIn = !!this.userId; 
  }

  setLoggedIn(log: boolean) {
    this.isLoggedIn = log;
    if (!log) { 
      this.logout();
    }
  }

  setUser(user_id: string, user_name: string) {
    this.userId = user_id;  
    this.username = user_name; 
    localStorage.setItem('userId', user_id); 
    localStorage.setItem('username', user_name); 
    this.isLoggedIn = true; 
  }

  getUserId(): string {
    return this.userId; 
  }

  getUsername(): string {
    return this.username;  
  }
  
  get isUserLoggedIn(): boolean {  
    return this.isLoggedIn;
  }

  isUserFollowed(userId: number): boolean {
    return this.followedUsers.has(userId);
  }

  followUser(userId: number): void {
    this.followedUsers.add(userId);
    localStorage.setItem('followedUsers', JSON.stringify(Array.from(this.followedUsers))); 
  }

  unfollowUser(userId: number): void {
    this.followedUsers.delete(userId);
    localStorage.setItem('followedUsers', JSON.stringify(Array.from(this.followedUsers))); 
  }

  logout() {
    this.isLoggedIn = false;
    this.userId = "";
    this.username = "";
    this.followedUsers.clear(); 
    localStorage.removeItem('userId'); 
    localStorage.removeItem('username'); 
    localStorage.removeItem('followedUsers'); 
  }
}
