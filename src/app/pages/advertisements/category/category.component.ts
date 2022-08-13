import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdvertisementCardComponent } from 'src/app/components/advertisement-card/advertisement-card.component';
import { CategoryService } from 'src/app/services/category.service';
import { Advertisement } from '../../../models/advertisement.model';
import { AdvertisementService } from '../../../services/advertisement.service';

@Component({
  selector: 'app-advertisement-category',
  imports: [AdvertisementCardComponent, CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: true
})
export class AdvertisementCategoryComponent implements OnInit {
  advertisements?: Advertisement[];
  currentAdvertisement: Advertisement = {};
  currentIndex = -1;
  title = '';

  id: string | null = null;

  constructor(
    private categoryService: CategoryService, 
    private route: ActivatedRoute,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this.id = params.get('id');
      this.categoryService.getAdvertisements(this.id)
        .subscribe({
          next: (res) => {
            this.advertisements = res;
          },
          error: (e) => {
            this.toast.error(e.message, 'Error!');
          }
        });
      this.categoryService.get(this.id)
        .subscribe({
          next: (res) => {
            this.title = res.title;
          },
          error: (e) => {
            this.toast.error(e.message, 'Error!');
          }
        });
    });
  }

  generateEditUrl(advertisement: Advertisement): string {
    return `/advertisements/${advertisement._id}`;
  }
}
