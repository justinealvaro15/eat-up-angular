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
      return this.http.get<User[]>(`http://localhost:3000/api/users`);
    }

  updateUserList() {
    this.getUsersDisplay().toPromise().then((users) => {
      this._users.next(users);
  })
  }

  getFilteredUsers():User[] {
    return this._users.getValue().filter((user)=> { 
      return this.isUserNameorEmailMatch(user) ;
     });
  }

  setFilter(key: FilterKeys, filterValue: string) {
    this.filter[key] = filterValue;
    this.filterChanged.emit(this.filter);
  }

  addUser (newUser: User) {
    return this.http.post<User>('http://localhost:3000/api/users', newUser).subscribe();
  }
  deactivateUser(user: any) { //active user to inactive user
    //search the particular user then make user.status = inactive
    const payload = {
      active: false
    }
    return this.http.put<User>(`http://localhost:3000/api/users/${user.email} `,payload).toPromise().then((res)=>{console.log(res); });
  }

  addAdmin(newAdmin: Admin) {
    return this.http.post<Admin>('http://localhost:3000/api/admin', newAdmin).subscribe();
  }

  alreadyAdmin(): Admin[] {
    return this._admins.getValue().filter((admin)=> {
      return this.isAdminEmailMatch(admin);
    });
  }

  // private isActive(user:User): boolean {
  //   if (user.active == true) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  getUserByEmail(email: string) {
    return this.http.get<User | null>(`http://localhost:3000/api/users/${email}`).pipe(
        map((users: any) => {
            return users.length > 0 ? users[0] : null;
        })
    );
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