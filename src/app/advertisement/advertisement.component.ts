import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Advertisement } from '../models/advertisement.model';
import { AdvertisementService } from '../services/advertisement.service';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {
  advertisement: Advertisement = {
    title: '',
    description: '',
    location: '',
    price: 0,
    user: ''
  }
  submitting = false;
  
  constructor(private advertisementService: AdvertisementService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.advertisementService.get(id)
      .subscribe({
        next: (res) => {
          this.advertisement = res;
        },
        error: (e) => {
          console.error(e)
          this.submitting = false;
        }
      })
  }

  updateAdvertisement(): void {
    const data = {
      title: this.advertisement.title,
      description: this.advertisement.description,
      location: this.advertisement.location,
      price: this.advertisement.price
    };

    this.submitting = true;

    this.advertisementService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitting = false;
        },
        error: (e) => {
          console.error(e)
          this.submitting = false;
        }
      });
  }
}
