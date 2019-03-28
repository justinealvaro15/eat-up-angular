import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  public user: SocialUser;
  public loggedIn: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  onClose() {
    this.closeSidenav.emit();
  }
  alertUser() {
    window.alert("Please sign-in with your UP Mail to use this feature.");
  }
}
