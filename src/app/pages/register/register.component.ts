import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  };

  submitting = false;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  registerAuth(): void {
    this.submitting = true;

    const toSubmit: {
      firstName: string,
      lastName: string,
      email: string,
      username: string,
      password: string,
      confirmPassword?: string
    } = { ...this.register };

    delete toSubmit.confirmPassword;

    if (toSubmit.password === this.register.confirmPassword) {
      this.authService.register(toSubmit).subscribe((res: any) => {
        if (res.success) {
          this.router.navigate(['/login']);
        } else {
          window.alert(res.message);
        }
      });
    }

    this.submitting = false;
  }

}
