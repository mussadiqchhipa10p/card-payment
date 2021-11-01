import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { PaymentDetail } from '../../payment-detail';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentFormComponent } from '../payment-form/payment-form.component';

import { globals } from 'src/app/globals';
import { UiService } from 'src/app/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-item',
  templateUrl: './payment-item.component.html',
  styleUrls: ['./payment-item.component.css'],
})
export class PaymentItemComponent implements OnInit {
  subscription = new Subscription();

  @Input() detail: PaymentDetail;
  @Output() updateDetailsEvent = new EventEmitter();
  @Output() deleteDetailsEvent = new EventEmitter();
  toggleSecurityCode: boolean = false;
  togglePasswordText: string = 'Show password';

  constructor(private modalService: NgbModal, public uiService: UiService) {
    this.subscription = uiService
      .ontoggle()
      .subscribe((value) => (globals.isUpdateViaModal = value));
  }

  ngOnInit(): void {}

  toggleSecurity(): void {
    this.toggleSecurityCode = !this.toggleSecurityCode;
    this.togglePasswordText = this.toggleSecurityCode
      ? 'Hide Password'
      : 'Show Password';
  }

  updateDetails(): void {
    this.updateDetailsEvent.emit(this.detail);
    if (globals.isUpdateViaModal) {
      const modalRef = this.modalService.open(PaymentFormComponent);
      modalRef.componentInstance.name = 'paymentmodal';
    }
  }

  onDelete() {
    this.deleteDetailsEvent.emit(this.detail);
  }
}
