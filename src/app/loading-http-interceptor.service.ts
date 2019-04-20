import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';

@Injectable()
export class LoadingHttpInterceptorService implements HttpInterceptor {

  constructor(private loadingService: LoadingService) { }

  intercept(req, next) {
    this.loadingService.showLoading();
    return next.handle()
      .finally(() => {
        this.loadingService.hideLoading()
      })
      .catch((err) => {
        this.loadingService.hideLoading();
        return Observable.throw(err);
      })
  }
}
