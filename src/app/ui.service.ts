import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { globals } from './globals';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  showModal: boolean = globals.isUpdateViaModal;

  private subject = new Subject<any>();
  constructor() {}

  toggleShowModal() {
    this.showModal = !this.showModal;
    this.subject.next(this.showModal);
  }

  ontoggle() {
    return this.subject.asObservable();
  }
}
