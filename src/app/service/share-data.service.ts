import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareDataService {
  constructor() {}

  private ngOnInitTrigger = new Subject<void>();

  ngOnInitTriggered$ = this.ngOnInitTrigger.asObservable();

  triggerOnInit(): void {
    this.ngOnInitTrigger.next();
  }
}
