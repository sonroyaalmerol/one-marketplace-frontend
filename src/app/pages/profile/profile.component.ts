import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdvertisementCardComponent } from 'src/app/components/advertisement-card/advertisement-card.component';
import { Advertisement } from 'src/app/models/advertisement.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule, AdvertisementCardComponent, FormsModule],
  standalone: true
})
export class ProfileComponent implements OnInit {
  id: string | null = null;

  profile?: User

  profileForm = {
    firstName: '',
    lastName: '',
    email: ''
  };

  advertisements?: Advertisement[]

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) { }

  get isCurrentUser(): boolean {
    return this.authService.getCurrentUserId() === this.id;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this.id = params.get('id');
      this.getUser();
      this.getAdvertisementsOwned();
    });
  }

  getUser(): void {
    this.userService.get(this.id)
      .subscribe({
        next: (res) => {
          this.profile = res;
          this.profileForm.email = res.email;
          this.profileForm.firstName = res.firstName;
          this.profileForm.lastName = res.lastName;
        },
        error: (e) => {
          this.toast.error('Error!', e.message);
        }
      });
  }

  editUser(): void {
    this.userService.update(this.id, this.profileForm)
      .subscribe({
        next: (res) => {
          document.getElementById('close-modal')?.click();
          this.toast.success("Successfully updated user!", "Success!");
          this.ngOnInit();
        },
        error: (e) => {
          this.toast.error('Error!', e.message);
        }
      });
  }

  getAdvertisementsOwned(): void {
    this.userService.getAdvertisements(this.id)
      .subscribe({
        next: (res) => {
          this.advertisements = res;
        },
        error: (e) => {
          this.toast.error('Error!', e.message);
        }
      });
  }

}
