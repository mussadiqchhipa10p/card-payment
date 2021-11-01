import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from '../payment-detail';
import { PaymentDetailService } from '../services/payment-detail.service';
import { globals } from '../globals';
import { UiService } from '../ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css'],
})
export class PaymentDetailComponent implements OnInit {
  subscription = new Subscription();
  showform: boolean = globals.isUpdateViaModal;

  constructor(
    public paymentDetailService: PaymentDetailService,
    private toastr: ToastrService,
    public uiService: UiService
  ) {
    this.subscription = uiService
      .ontoggle()
      .subscribe((value) => (this.showform = value));
  }

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
