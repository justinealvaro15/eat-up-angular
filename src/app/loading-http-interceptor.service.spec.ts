import { TestBed, inject } from '@angular/core/testing';

import { LoadingHttpInterceptorService } from './loading-http-interceptor.service';

describe('LoadingHttpInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingHttpInterceptorService]
    });
  });

  it('should be created', inject([LoadingHttpInterceptorService], (service: LoadingHttpInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
