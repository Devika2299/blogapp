import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{


  signupForm = this.fb.group(
    {
      fname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-z]+)*$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}/)]],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    }, {
    validators: passwordMatchValidator
  })

  constructor(private fb: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {


  }

  get fname() {
    return this.signupForm.controls['fname']
  }
  get email() {
    return this.signupForm.controls['email']
  }

  get phone() {
    return this.signupForm.controls['phone']
  }

  get password() {
    return this.signupForm.controls['password']
  }

  get confirmpassword() {
    return this.signupForm.controls['confirmpassword']
  }
  signup() {
    if (this.signupForm.valid) {
      const user = {
        fname: this.signupForm.controls['fname'].value,
        email: this.signupForm.controls['email'].value,
        phone: this.signupForm.controls['phone'].value,
        password: this.signupForm.controls['password'].value,
      };

      this.apiService.signup(user).subscribe(data => {
        if (data['success'] === true) {
          localStorage.setItem('fname', data.fname!);
          alert("User Created");
        } else {
          alert(data['msg']);
        }
      });
    }
  } 

}
