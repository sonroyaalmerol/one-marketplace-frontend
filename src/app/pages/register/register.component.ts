import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  subscriptions: Subscription[] = [];
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
    private router: Router,
    private toast: ToastrService
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
      this.subscriptions.push(
        this.authService.register(toSubmit).subscribe((res: any) => {
          if (res.success) {
            this.toast.success('Successfully registered user!', 'Success!');
            this.router.navigate(['/login']);
          } else {
            this.toast.error(res.message, 'Error!');
          }
        })
      )
      
    }

    this.submitting = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
