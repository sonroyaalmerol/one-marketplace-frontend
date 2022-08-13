import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: string | null = null;

  profile?: User

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this.id = params.get('id');
      this.getUser();
    });
  }

  getUser(): void {
    this.userService.get(this.id)
      .subscribe({
        next: (res) => {
          this.profile = res;
        },
        error: (e) => {
          this.toast.error('Error!', e.message);
        }
      });
  }

}
