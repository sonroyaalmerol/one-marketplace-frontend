import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { Advertisement } from '../../../models/advertisement.model';
import { AdvertisementService } from '../../../services/advertisement.service';

@Component({
  selector: 'app-advertisement-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class AdvertisementEditComponent implements OnInit {
  subscriptions: Subscription[] = [];


  advertisement: Advertisement = {
    title: '',
    description: '',
    location: '',
    price: 0,
    user: '',
    expiresAt: new Date(),
    disabled: false
  }

  categories?: Category[];

  id: string | null = null;
  
  submitting = false;
  
  constructor(
    private advertisementService: AdvertisementService, 
    private categoryService: CategoryService,
    private route: ActivatedRoute, 
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => { 
        this.id = params.get('id');
        this.advertisementService.get(this.id)
        .subscribe({
          next: (res) => {
            this.advertisement = res;
          },
          error: (e) => {
            this.toast.error(e.message, 'Error!');
          }
        });
      })
    );
    
  }

  getAllCategories(): void {
    this.subscriptions.push(
      this.categoryService.getAll()
      .subscribe({
        next: (res) => {
          this.categories = res;
        },
        error: (e) => {
          this.toast.error(e.message, 'Error!');
        }
      })
    )
    
  }

  updateAdvertisement(): void {
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

    this.subscriptions.push(
      this.advertisementService.update(this.id, data)
      .subscribe({
        next: (res) => {
          this.submitting = false;
          this.toast.success('Successfully updated advertisement!', 'Success!')
          this.router.navigate([`/advertisements/${this.id}`]);
        },
        error: (e) => {
          this.toast.error(e.message, 'Error!');
          this.submitting = false;
        }
      })
    )
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
