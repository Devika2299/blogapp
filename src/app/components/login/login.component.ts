


import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginform = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService, 
    private router: Router, 
    private authService: AuthService
  ) { }

  get email() {
    return this.loginform.controls['email'];
  }

  get password() {
    return this.loginform.controls['password'];
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    const user = {
      email: this.email.value,
      password: this.password.value
    };

    this.apiService.login(user).subscribe({
      next: (result) => {
        if (result['success']) {
          this.authService.setLoggedIn(true);
          this.authService.setUser(result['user_id'], result['user_name']);
          
         
          localStorage.setItem('userId', result['user_id'].toString());
          localStorage.setItem('username', result['user_name']); 
          
   
          this.router.navigate(['home']);
        } else {
          alert(result.message); 
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Login failed: ' + JSON.stringify(error)); 
      }
    });
  }
}







