import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private router: Router,
    private toast: ToastrService
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
          this.toast.success('Successfully logged in!', 'Success!');
          this.router.navigate(['/']);
        },
        error: (e) => {
          console.error(e)
          this.toast.error(e.message, 'Error!');
          this.submitting = false;
        }
      });
  }

}
