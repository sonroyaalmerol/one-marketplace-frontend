import { Component, Input, OnInit } from '@angular/core';
import { Advertisement } from 'src/app/models/advertisement.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import * as numeral from 'numeral';
import { Question } from 'src/app/models/question.model';
import { Answer } from 'src/app/models/answer.model';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class QuestionCardComponent implements OnInit {
  @Input() question?: Question;
  @Input() advertisement?: Advertisement;

  newAnswerContent?: string;

  answer?: Answer;

  modalMode?: string;

  constructor(
    public advertisementService: AdvertisementService,
    public authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAnswer();
  }

  get isOwnedByCurrentUser(): boolean {
    return this.advertisement?.user === this.authService.getCurrentUserId()
  }

  getAnswer(): void {
    this.advertisementService.getAnswer(this.advertisement?._id, this.question?._id)
      .subscribe({
        next: (data) => {
          this.answer = data;
        },
        error: (e) => this.toast.error(e.message, 'Error!')
      });
  }

  submitAnswer(): void {
    const data = {
      content: this.newAnswerContent
    };

    if (this.newAnswerContent?.trim().length ?? 0 > 0) {
      this.advertisementService.createAnswer(this.advertisement?._id, this.question?._id, data)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.ngOnInit();
            this.toast.success('Successfully answered inquiry!', 'Success!')
            document.getElementById(`close-modal-${this.question?._id}`)?.click();
          },
          error: (e) => {
            this.toast.error(e.message, 'Error!');
          }
        });
    }
  }

  editAnswer(): void {
    const data = {
      content: this.newAnswerContent
    };

    if (this.newAnswerContent?.trim().length ?? 0 > 0) {
      this.advertisementService.editAnswer(this.advertisement?._id, this.question?._id, data)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.ngOnInit();
            this.toast.success('Successfully updated inquiry answer!', 'Success!')

            document.getElementById(`close-modal-${this.question?._id}`)?.click();
          },
          error: (e) => {
            this.toast.error(e.message, 'Error!');
          }
        });
    }
  }

  deleteAnswer(): void {
    this.advertisementService.deleteAnswer(this.advertisement?._id, this.question?._id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.ngOnInit();
          
          this.toast.success('Successfully deleted answer!', 'Success!')
        },
        error: (e) => {
          this.toast.error(e.message, 'Error!');
        }
      });
  }
}
