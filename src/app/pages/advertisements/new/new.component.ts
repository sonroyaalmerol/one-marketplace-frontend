import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { Advertisement } from '../../../models/advertisement.model';
import { AdvertisementService } from '../../../services/advertisement.service';

@Component({
  selector: 'app-advertisement-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class AdvertisementNewComponent implements OnInit {

  advertisement: Advertisement = {
    title: '',
    description: '',
    location: '',
    price: 0,
    user: ''
  }

  categories?: Category[];

  submitting = false;

  constructor(
    private advertisementService: AdvertisementService,
    private categoryService: CategoryService,
    private router: Router,
    private toast: ToastrService
    ) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoryService.getAll()
      .subscribe({
        next: (res) => {
          this.categories = res;
        },
        error: (e) => {
          this.toast.error(e.message, 'Error!');
        }
      });
  }

  saveAdvertisement(): void {
    const data = {
      title: this.advertisement.title,
      description: this.advertisement.description,
      location: this.advertisement.location,
      price: this.advertisement.price,
      expiresAt: this.advertisement.expiresAt,
      disabled: this.advertisement.disabled,
      category: this.advertisement.category
    };

    this.submitting = true;

    this.advertisementService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitting = false;
          this.router.navigate([`/advertisements/${res._id}`]);
        },
        error: (e) => {
          this.toast.error(e.message, 'Error!');
          this.submitting = false;
        }
      });
  }
}
