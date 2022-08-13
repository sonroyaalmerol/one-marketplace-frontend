import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {
  subscriptions: Subscription[] = [];
  categories?: Category[];
  searchQuery?: string;
  fullName?: string;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.retrieveCategories();
  }

  retrieveCategories(): void {
    this.subscriptions.push(
      this.categoryService.getAll()
      .subscribe({
        next: (data) => {
          this.categories = data;
        },
        error: (e) => console.error(e)
      })
    );
  }

  getUserFullName(): void {
    this.subscriptions.push(
      this.userService.get(this.authService.getCurrentUserId())
      .subscribe({
        next: (data) => {
          this.fullName = `${data.firstName} ${data.lastName}`;
        },
        error: (e) => console.error(e)
      })
    );
  }

  logout(): void {
    this.authService.doLogout();
    this.router.navigate(['/login']);
  }

  search(): void {
    this.router.navigate(['/advertisements/search'], { queryParams: { query: this.searchQuery } });
  }
  
  myProfile(): void {
    let currentUserId = this.authService.getCurrentUserId();

    this.router.navigate([`/profiles/${currentUserId}`]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
