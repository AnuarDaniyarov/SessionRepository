import { Component } from '@angular/core';
import { EmailService, EmailRequest } from './email.service';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class EmailComponent {
  emailData: EmailRequest = {
    recipient: '',
    subject: '',
    message: '',
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private emailService: EmailService) {}

  sendEmail(): void {
    this.successMessage = null;
    this.errorMessage = null;

    this.emailService.sendEmail(this.emailData).subscribe({
      next: (response) => {
        this.successMessage = response;
      },
      error: (error) => {
        this.errorMessage = 'Ошибка при отправке email: ' + error.error;
      },
    });
  }
}
