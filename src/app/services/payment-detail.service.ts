import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaymentDetail } from '../payment-detail';

@Injectable({
  providedIn: 'root',
})
export class PaymentDetailService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private url: string = 'http://localhost:8000/api/PaymentDetail';
  formData: PaymentDetail = new PaymentDetail();
  list: PaymentDetail[];

  getPaymentCardDetails(): Observable<PaymentDetail[]> {
    return this.http.get<PaymentDetail[]>(this.url);
  }

  refreshList() {
    this.http
      .get<PaymentDetail[]>(this.url)
      .toPromise()
      .then((res) => (this.list = res as PaymentDetail[]));
  }

  insertPaymentCardDetails(): Observable<PaymentDetail> {
    return this.http.post<PaymentDetail>(
      this.url,
      this.formData,
      this.httpOptions
    );
  }

  updatePaymentCardDetails(): Observable<PaymentDetail> {
    const updateUrl: string = `${this.url}/${this.formData.paymentDetailId}`;

    return this.http.put<PaymentDetail>(
      updateUrl,
      this.formData,
      this.httpOptions
    );
  }

  deleteDetails(id: string): Observable<PaymentDetail> {
    const deleteUrl: string = `${this.url}/${id}`;
    console.log(deleteUrl);
    return this.http.delete<PaymentDetail>(deleteUrl, this.httpOptions);
  }
}
