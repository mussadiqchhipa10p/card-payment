import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { PaymentDetail } from '../../payment-detail';

@Component({
  selector: 'app-payment-item',
  templateUrl: './payment-item.component.html',
  styleUrls: ['./payment-item.component.css'],
})
export class PaymentItemComponent implements OnInit {
  constructor() {}

  @Input() detail: PaymentDetail;
  @Output() updateDetailsEvent = new EventEmitter();
  @Output() deleteDetailsEvent = new EventEmitter();
  toggleSecurityCode: boolean = false;
  togglePasswordText: string = 'Show password';

  ngOnInit(): void {}

  toggleSecurity(): void {
    this.toggleSecurityCode = !this.toggleSecurityCode;
    this.togglePasswordText = this.toggleSecurityCode
      ? 'Hide Password'
      : 'Show Password';
  }

  updateDetails(): void {
    this.updateDetailsEvent.emit(this.detail);
  }

  onDelete() {
    this.deleteDetailsEvent.emit(this.detail);
  }
}
