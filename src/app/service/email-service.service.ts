import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  constructor(private http: HttpClient) { }

 private url = "https://juicy-camera-production.up.railway.app/api/v1/send-email"

  public sendEmail(data: any){
   return this.http.post(this.url, data);
  }
}
