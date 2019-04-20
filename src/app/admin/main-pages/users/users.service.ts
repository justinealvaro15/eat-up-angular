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
        this.updateAdminList();
        // this.authService.authState.subscribe((user) => {
        //     this.user = user;
        // }) 
    }
    filter = {
      name_or_id:''
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
    getAdminsDisplay() {
      return this.http.get<Admin[]>(`http://localhost:3000/api/admin`);
    }

  updateUserList() {
    this.getUsersDisplay().toPromise().then((users) => {
      this._users.next(users);
  })
  }

  updateAdminList() {
    this.getAdminsDisplay().toPromise().then((admins) => {
      this._admins.next(admins);
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
    console.log(user.user_id);
    const payload = {
      user,
      active: false
    }
    return this.http.put<User>(`http://localhost:3000/api/users/${user.user_id} `,payload).toPromise().then((res)=>{console.log(res); });
  }

  activateUser(user: any) { //active user to inactive user
    //search the particular user then make user.status = active
    const payload = {
      user,
      active: true
    }
    return this.http.put<User>(`http://localhost:3000/api/users/${user.user_id} `,payload).toPromise().then((res)=>{console.log(res); });
  }

  getFilteredAdmins(): Admin[] {
    return this._admins.getValue().filter((admin)=> {
      return this.isAdminIdMatch(admin);
    });
  }

  adminStatus (user:any) {
    const payload = {
      user,
      isAdmin: true
    }
    return this.http.put<User>(`http://localhost:3000/api/users/${user.user_id} `,payload).toPromise().then((res)=>{console.log(res); });
  }
  addAdmin(newAdmin: Admin) {
    return this.http.post<Admin>('http://localhost:3000/api/admin', newAdmin).subscribe();
  }

  deactivateAdmin(admin: any) { //remove as admin
    return this.http.delete<User>(`http://localhost:3000/api/admin/${admin.user_id} `).toPromise().then((res)=>{console.log(res); });
  }


  private isAdminIdMatch(admin: Admin): boolean {
    if (!this.filter.name_or_id) {
      return true;
    }
    const isId = admin.user_id===this.filter.name_or_id;

    return isId;
  }

  private isUserNameorEmailMatch(user:User): boolean{
    if (!this.filter.name_or_id) {
        return true;
    }
    const name = user.first_name + " " + user.last_name;
    const isName = name.toLowerCase().includes(this.filter.name_or_id.toLowerCase());
    const isId = user.user_id === this.filter.name_or_id;

    return isName || isId;
  }

}

 
export enum FilterKeys {
  Name_Or_Id='name_or_id'
}