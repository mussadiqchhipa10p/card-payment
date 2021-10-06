import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from '../payment-detail';
import { PaymentDetailService } from '../services/payment-detail.service';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css'],
})
export class PaymentDetailComponent implements OnInit {
  constructor(
    public paymentDetailService: PaymentDetailService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.paymentDetailService.refreshList();
  }

  setDetailVariable(detail: PaymentDetail): void {
    this.paymentDetailService.formData = Object.assign({}, detail);
  }
  deletePaymentDetails(detail: PaymentDetail) {
    this.paymentDetailService
      .deleteDetails(detail.paymentDetailId)
      .subscribe((res) => this.paymentDetailService.refreshList());

    this.toastr.error('Deleted');
  }

  login(): void {
    const user = {
      username: 'mussadiq',
      password: 'Abc12345@',
    };
  }
}
