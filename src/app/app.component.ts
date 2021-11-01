import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentFormComponent } from './payment-detail/payment-form/payment-form.component';
import { UiService } from './ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public uiService: UiService, public modalService: NgbModal) {
    this.setModalButtonText();
  }
  title = 'PaymentApp';
  modalButtonText = '';

  toggleModal() {
    this.uiService.toggleShowModal();
    this.setModalButtonText();
  }

  setModalButtonText() {
    if (this.uiService.showModal) this.modalButtonText = 'Hide Modal';
    else this.modalButtonText = 'Show Modal';
  }

  AddNew() {
    console.log('here!!!');
    const modalRef = this.modalService.open(PaymentFormComponent);
    modalRef.componentInstance.name = 'paymentmodal';
  }
}
