import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/payment-detail';
import { PaymentDetailService } from 'src/app/services/payment-detail.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css'],
})
export class PaymentFormComponent implements OnInit {
  @Input() name: string;

  constructor(
    public service: PaymentDetailService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    if (this.service.formData.paymentDetailId == '') this.insertRecord(form);
    else this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.insertPaymentCardDetails().subscribe(
      (res) => {
        this.resetForm(form);
        this.service.refreshList();
        this.showMessage('submitted');
        this.activeModal.close('Close click');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  showMessage(message: string) {
    this.toastr.success(message, 'payment form');
  }

  updateRecord(form: NgForm) {
    this.service.updatePaymentCardDetails().subscribe(
      (res) => {
        this.resetForm(form);
        this.service.refreshList();
        this.showMessage('Updated');
        this.activeModal.close('Close click');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }

  onCancel(form: NgForm) {
    this.resetForm(form);
    this.activeModal.dismiss();
  }
}
