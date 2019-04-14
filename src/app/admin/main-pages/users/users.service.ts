import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, Admin } from './user.model';
import { AuthService, SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(     
    private authService: AuthService,
    private http: HttpClient,
  ) {
        this.updateUserList();
        // this.authService.authState.subscribe((user) => {
        //     this.user = user;
        // }) 
    }
    filter = {
      name_or_email:''
    }
    private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    private _admins: BehaviorSubject<Admin[]> = new BehaviorSubject<Admin[]>([]);
    filterChanged = new EventEmitter();

    getUsers(): BehaviorSubject<User[]> {
      return this._users;
    } 
    getAdmin(): BehaviorSubject<Admin[]> {
      return this._admins;
    } 

    getUsersDisplay() {
      return this.http.get<User[]>('http://localhost:3000/api/users');
    }

  updateUserList() {
    this.getUsersDisplay().toPromise().then((users) => {
      this._users.next(users);
  })
  }

  getFilteredUsers():User[] {
    return this._users.getValue().filter((user)=> { //EMPTY
      return this.isUserNameorEmailMatch(user);
     });
  }

  setFilter(key: FilterKeys, filterValue: string) {
    this.filter[key] = filterValue;
    this.filterChanged.emit(this.filter);
  }

  deactivateUser(user: any) { //active user to inactive user
    //search the particular user then make user.status = inactive

  }

  addAdmin(newAdmin: Admin) {
    return this.http.post<Admin>('http://localhost:3000/api/admin', newAdmin).subscribe();
  }

  alreadyAdmin(): Admin[] {
    return this._admins.getValue().filter((admin)=> {
      return this.isAdminEmailMatch(admin);
    });
  }

  private isAdminEmailMatch(admin: Admin): boolean {
    if (!this.filter.name_or_email) {
      return true;
    }
    const isEmail = admin.email.toLowerCase().includes(this.filter.name_or_email.toLowerCase());

    return isEmail;
  }

  private isUserNameorEmailMatch(user:User): boolean{
    if (!this.filter.name_or_email) {
        return true;
    }

    const isName = user.name.toLowerCase().includes(this.filter.name_or_email.toLowerCase());
    const isEmail = user.email.toLowerCase().includes(this.filter.name_or_email.toLowerCase());

    return isName || isEmail;
  }

}

 
export enum FilterKeys {
  Name_Or_Email='name_or_email'
}