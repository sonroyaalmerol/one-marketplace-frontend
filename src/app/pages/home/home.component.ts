import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
    this.advertisementService.getAll()
      .subscribe({
        next: (data) => {
          this.advertisements = data;
          console.log(data);
        },
        error: (e) => this.toast.error(e.message, 'Error!')
      });
  }
  refreshList(): void {
    this.retrieveAdvertisements();
    this.currentAdvertisement = {};
    this.currentIndex = -1;
  }
  generateEditUrl(advertisement: Advertisement): string {
    return `/advertisements/${advertisement._id}`;
  }
  deleteAdvertisement(advertisement: Advertisement): void {
    this.advertisementService.delete(advertisement._id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => this.toast.error(e.message, 'Error!')
      })
  }
  removeAllAdvertisements(): void {
    this.advertisementService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => this.toast.error(e.message, 'Error!')
      });
  }

}
