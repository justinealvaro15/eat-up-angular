import { Component } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoading = false;
  //googleauth: GoogleAuthComponent;

  constructor(
    public loadingScreenService: LoadingService
  ){ }

  ngOnInit() {
    this.loadingScreenService.getIsLoading().subscribe(value => {
      Promise.resolve().then(() => this.isLoading = value);
    });
  }
}
