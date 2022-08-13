import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  submitting = false;

  constructor(
    private advertisementService: AdvertisementService, 
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  saveAdvertisement(): void {
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
          this.router.navigate(['/advertisements']);
        },
        error: (e) => {
          window.alert(e.message);
          this.submitting = false;
        }
      });
  }
}
