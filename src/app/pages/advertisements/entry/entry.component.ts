import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as numeral from 'numeral';
import { Subscription } from 'rxjs';
import { QuestionCardComponent } from 'src/app/components/question-card/question-card.component';
import { Question } from 'src/app/models/question.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Advertisement } from '../../../models/advertisement.model';
import { AdvertisementService } from '../../../services/advertisement.service';

@Component({
  selector: 'app-advertisement-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
  standalone: true,
  imports: [
    QuestionCardComponent,
    CommonModule,
    FormsModule
  ]
})
export class AdvertisementEntryComponent implements OnInit {
  subscriptions: Subscription[] = [];
  advertisement: Advertisement = {
    title: '',
    description: '',
    location: '',
    price: 0,
    user: ''
  }

  newQuestionContent?: string;

  questions?: Question[];

  owner?: User;
  
  id: string | null = null;
  
  submitting = false;
  
  constructor(
    private advertisementService: AdvertisementService, 
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => { 
        this.id = params.get('id');
        this.advertisementService.get(this.id)
        .subscribe({
          next: (res) => {
            this.advertisement = res;
            this.getOwnerDetails();
            this.getQuestions();
          },
          error: (e) => {
            this.toast.error('Error!', e.message);
          }
        });
      })
    )
    
  }

  get isOwnedByCurrentUser(): boolean {
    return this.advertisement.user === this.authService.getCurrentUserId()
  }

  get price(): string {
    return numeral(this.advertisement.price).format('$0,0.00');
  }
  
  submitQuestion(): void {
    const data = {
      content: this.newQuestionContent
    };

    if (this.newQuestionContent?.trim().length ?? 0 > 0) {
      this.subscriptions.push(
        this.advertisementService.createQuestion(this.advertisement?._id, data)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.submitting = false;
            this.ngOnDestroy();
            this.ngOnInit();

            this.toast.success('Successfully added inquiry! It will show up on the page as soon as the owner answers your inquiry.', 'Success!')
            document.getElementById('close-modal')?.click();
          },
          error: (e) => {
            this.toast.error(e.message, 'Error!');
            this.submitting = false;
          }
        })
      )
      
    }
  }

  getQuestions(): void {
    if (this.isOwnedByCurrentUser) {
      this.subscriptions.push(
        this.advertisementService.getAllQuestions(this.advertisement?._id)
        .subscribe({
          next: (data) => {
            this.questions = data;
          },
          error: (e) => console.error(e)
        })
      )
      
    } else {
      this.subscriptions.push(
        this.advertisementService.getAnsweredQuestions(this.advertisement?._id)
        .subscribe({
          next: (data) => {
            this.questions = data;
          },
          error: (e) => console.error(e)
        })
      )
      
    }
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
    )
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
