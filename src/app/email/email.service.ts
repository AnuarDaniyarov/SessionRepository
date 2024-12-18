import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmailRequest {
  recipient: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'http://localhost:8080/api/emails';

  constructor(private http: HttpClient) {}

  sendEmail(emailData: EmailRequest): Observable<string> {
    return this.http.post<string>(this.apiUrl, emailData);
  }
}
