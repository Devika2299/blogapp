
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost/dbapp_apiphp/dbapp_api/'; 

  constructor(private http: HttpClient) { }

  signup(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'blogSignup.php', user);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'blogLogin.php', user);
  }

  getPost(): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'getPost.php', {});
  }

  getPostById(id: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'getPostById.php', { id }); 
  }

  getBlogsByUser(userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}fetchblog.php`, { userId }); 
  }
 
  
 
  getPostsByFollowedUsers(followerId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}getPostsByFollowedUsers.php`, { followerId });
  }
  
  
createPostWithFiles(formData: FormData): Observable<any> {
  return this.http.post<any>(this.apiUrl + 'addPost.php', formData);
}

getDownloadLink(filePath: string): string {
  return `${this.apiUrl}download.php?file=${encodeURIComponent(filePath)}`;
}


  updatePost(id: string, postData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'editPost.php', { id, ...postData });
  }

  deletePost(id: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'deletePost.php', { id });
  }

getUsers(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}get_users.php`).pipe(
    catchError(err => {
      console.error('Error fetching users:', err);
      return of([]); 
    })
  );
}

followUser(userId: number, followerId: number): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}follow_user.php`, { userId, followerId })
    .pipe(
      catchError(err => {
        console.error('Error following user:', err);
        return of({ status: 'error', message: 'Failed to follow user.' });
      })
    );
}

unfollowUser(userId: number, followerId: number): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/unfollow_user.php`, { userId, followerId })
    .pipe(
      catchError(err => {
        console.error('Error unfollowing user:', err);
        return of({ status: 'error', message: 'Failed to unfollow user.' });
      })
    );
  }

isUserFollowed(userId: string, followedId: number): Observable<any> {
  return this.http.post('/api/isUserFollowed', { userId, followerId: followedId });
}
}
























































































// getUsersWithFollowStatus(currentUserId: string | null): Observable<any[]> {
//   const url = `${this.apiUrl}/get-users-with-follow-status.php?userId=${currentUserId}`;
//   return this.http.get<any[]>(url);
// }




// createPostWithFiles(formData: FormData): Observable<any> {
//   return this.http.post<any>(`${this.apiUrl}addPost.php`, formData, {
//     reportProgress: true,
//     observe: 'events'
//   });
// }
