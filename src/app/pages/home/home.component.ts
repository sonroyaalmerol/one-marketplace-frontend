import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AdvertisementCardComponent } from 'src/app/components/advertisement-card/advertisement-card.component';
import { Advertisement } from 'src/app/models/advertisement.model';
import { AdvertisementService } from 'src/app/services/advertisement.service';

@Component({
  selector: 'app-home',
  imports: [AdvertisementCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true
})
export class HomeComponent implements OnInit {
  subscriptions: Subscription[] = [];

  advertisements?: Advertisement[];
  currentAdvertisement: Advertisement = {};
  currentIndex = -1;
  title = '';
  constructor(
    private advertisementService: AdvertisementService,
    private toast: ToastrService
  ) { }
  ngOnInit(): void {
    this.retrieveAdvertisements();
  }
  retrieveAdvertisements(): void {
    this.subscriptions.push(
      this.advertisementService.getAll()
      .subscribe({
        next: (data) => {
          this.advertisements = data;
          console.log(data);
        },
        error: (e) => this.toast.error(e.message, 'Error!')
      })
    )
    
  }
  refreshList(): void {
    this.retrieveAdvertisements();
    this.currentAdvertisement = {};
    this.currentIndex = -1;
  }
  generateEditUrl(advertisement: Advertisement): string {
    return `/advertisements/${advertisement._id}`;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
