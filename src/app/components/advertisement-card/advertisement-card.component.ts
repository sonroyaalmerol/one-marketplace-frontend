import { Component, Input, OnInit } from '@angular/core';
import { Advertisement } from 'src/app/models/advertisement.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import * as numeral from 'numeral';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-advertisement-card',
  templateUrl: './advertisement-card.component.html',
  styleUrls: ['./advertisement-card.component.css'],
  standalone: true
})
export class AdvertisementCardComponent implements OnInit {
  subscriptions: Subscription[] = [];
  @Input() advertisement?: Advertisement;
  owner?: User;

  constructor(
    public userService: UserService
  ) { }

  get price(): string {
    return numeral(this.advertisement?.price).format('$0,0.00');
  }

  ngOnInit(): void {
    this.getOwnerDetails();
  }

  getOwnerDetails(): void {
    this.subscriptions.push(
      this.userService.get(this.advertisement?.user)
        .subscribe({
          next: (data) => {
            this.owner = data;
          },
          error: (e) => console.error(e)
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
