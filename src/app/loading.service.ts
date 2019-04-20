import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoadingService {
  private showLoadingCount = 0;
  private isLoading = new BehaviorSubject(false);
  constructor() { }

  showLoading() {
    this.showLoadingCount++;

    this.isLoading.next(true);
  }

  hideLoading() {
    if (this.showLoadingCount > 0) {
      this.showLoadingCount--;
    }

    this.isLoading.next(this.showLoadingCount > 0);
  }

  getIsLoading() {
    return this.isLoading;
  }
}
