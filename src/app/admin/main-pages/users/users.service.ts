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
    filterChanged = new EventEmitter();

    getUsers(): BehaviorSubject<User[]> {
      return this._users;
    } 

    getUsersDisplay() {
      console.log("getUsersDisplay: "+ this.http.get<User[]>('http://localhost:3000/api/users')); //undefined
      return this.http.get<User[]>('http://localhost:3000/api/users');
    }

  updateUserList() {
    this.getUsersDisplay().toPromise().then((users) => {
      this._users.next(users);
  })
  }

  getFilteredUsers():User[] {
    return this._users.getValue().filter((user)=> { //EMPTY
      return this.isNameorEmailMatch(user);
     });
  }

  setFilter(key: FilterKeys, filterValue: string) {
    this.filter[key] = filterValue;
    this.filterChanged.emit(this.filter);
  }

  addAdmin(newAdmin: Admin) {
    return this.http.post<Admin>('http://localhost:3000/api/admin', newAdmin);
  }

  private isNameorEmailMatch(user:User): boolean{
    if (!this.filter.name_or_email) {
        return true;
    }

    const isName = user.name.toLowerCase().includes(this.filter.name_or_email.trim().toLowerCase());
    const isEmail = user.email.toLowerCase().includes(this.filter.name_or_email.trim().toLowerCase());

    return isName || isEmail;
  }

}

 
export enum FilterKeys {
  Name_Or_Email='name_or_email'
}