import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = {
    username: '',
    password: ''
  };
  
  submitting = false;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  loginAuth(): void {
    this.submitting = true;

    this.authService.login(this.login)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitting = false;
          window.alert("Successfully logged in!");
          this.router.navigate(['/']);
        },
        error: (e) => {
          console.error(e)
          window.alert(e.message);
          this.submitting = false;
        }
      });
  }

}
