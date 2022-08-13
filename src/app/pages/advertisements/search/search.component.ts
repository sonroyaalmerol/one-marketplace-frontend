import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdvertisementCardComponent } from 'src/app/components/advertisement-card/advertisement-card.component';
import { CategoryService } from 'src/app/services/category.service';
import { Advertisement } from '../../../models/advertisement.model';
import { AdvertisementService } from '../../../services/advertisement.service';

@Component({
  selector: 'app-advertisement-search',
  imports: [AdvertisementCardComponent, CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true
})
export class AdvertisementSearchComponent implements OnInit {
  advertisements?: Advertisement[];
  currentAdvertisement: Advertisement = {};
  currentIndex = -1;
  title = '';

  query: string | null = null;

  constructor(
    private advertisementService: AdvertisementService, 
    private route: ActivatedRoute,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => { 
      this.query = params.get('query');
      this.title = `Search results for "${this.query}"`
      this.advertisementService.search(this.query)
        .subscribe({
          next: (res) => {
            this.advertisements = res;
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
