import { Component, OnInit } from '@angular/core';
import { Advertisement } from '../models/advertisement.model';
import { AdvertisementService } from '../services/advertisement.service';

@Component({
  selector: 'app-advertisement-list',
  templateUrl: './advertisement-list.component.html',
  styleUrls: ['./advertisement-list.component.css']
})
export class AdvertisementListComponent implements OnInit {
  advertisements?: Advertisement[];
  currentAdvertisement: Advertisement = {};
  currentIndex = -1;
  title = '';
  constructor(private advertisementService: AdvertisementService) { }
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
        error: (e) => console.error(e)
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
        error: (e) => window.alert(e.message)
      })
  }
  removeAllAdvertisements(): void {
    this.advertisementService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => window.alert(e.message)
      });
  }
}
