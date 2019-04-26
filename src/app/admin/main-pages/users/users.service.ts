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

  getFilteredUsers():User[] { //get list of users
    return this._users.getValue().filter((user)=> { 
      return this.isUserNameorEmailMatch(user) ;
     });
  }

  setFilter(key: FilterKeys, filterValue: string) {
    this.filter[key] = filterValue;
    this.filterChanged.emit(this.filter);
  }

  addUser (newUser: User) { //add new user to database
    return this.http.post<User>('http://localhost:3000/api/users', newUser).subscribe();
  }

  deactivateUser(user: any) { //active user to inactive user
    //search the particular user then make user.status = inactive
    //goes in
    const payload = {
      user ,
      deactivated: {
        deactivated_by: user.deactivated.deactivated_by,
        deactivated_on: {
          year:user.deactivated.deactivated_on.year,
          month:user.deactivated.deactivated_on.month,
          day: user.deactivated.deactivated_on.day,
          hour: user.deactivated.deactivated_on.hour,
          minute: user.deactivated.deactivated_on.minute,
          second: user.deactivated.deactivated_on.second,
        }
      },
      active: false
    }
    return this.http.put<User>(`http://localhost:3000/api/users/${user.user_id} `,payload).toPromise().then((res)=>{console.log(res); });
  }

  activateUser(user: any) { //inactive user to active user
    //search the particular user then make user.status = active
    const payload = {
      user,
      deactivated: {
        deactivated_by: user.deactivated.deactivated_by,
        deactivated_on: {
          year:user.deactivated.deactivated_on.year,
          month:user.deactivated.deactivated_on.month,
          day: user.deactivated.deactivated_on.day,
          hour: user.deactivated.deactivated_on.hour,
          minute: user.deactivated.deactivated_on.minute,
          second: user.deactivated.deactivated_on.second,
        }
      },
      active: true
    }
    return this.http.put<User>(`http://localhost:3000/api/users/${user.user_id} `,payload).toPromise().then((res)=>{console.log(res); });
  }

  updateUserLastActive(user:any) { //update user last active date
    const payload = {
      last_active: {
        year: user.last_active.year,
        month: user.last_active.month,
        day: user.last_active.day,
        hour: user.last_active.hour,
        minute:user.last_active.minute,
        second:user.last_active.second
      }
    }
    return this.http.put<User>(`http://localhost:3000/api/users/${user.user_id} `,payload).toPromise().then((res)=>{console.log(res); });
  }

  getFilteredAdmins(): Admin[] {
    return this._admins.getValue().filter((admin)=> {
      return this.isAdminIdMatch(admin);
    });
  }

  isAdminStatusToTrue (user:any) {
    const payload = {
      user,
      isAdmin: true
    }
    return this.http.put<User>(`http://localhost:3000/api/users/${user.user_id} `,payload).toPromise().then((res)=>{console.log(res); });
  }

  isAdminStatusToFalse (admin:any) {
    const payload = {
      admin,
      isAdmin: false
    }
    return this.http.put<User>(`http://localhost:3000/api/users/${admin.user_id} `,payload).toPromise().then((res)=>{console.log(res); });
  }


  addAdmin(newAdmin: Admin) {
    return this.http.post<Admin>('http://localhost:3000/api/admin', newAdmin).subscribe();
  }

  deactivateAdmin(admin: any) { //remove as admin
    return this.http.delete<User>(`http://localhost:3000/api/admin/${admin.user_id} `).toPromise().then((res)=>{console.log(res); });
  }

  private avgRatingsGiven(user:User): number {
    return 0;
  }

  private isAdminIdMatch(admin: Admin): boolean {
    if (!this.filter.name_or_id) {
      return true;
    }

    const name = admin.first_name + " " + admin.last_name;
    const isId = admin.user_id===this.filter.name_or_id;
    const isName = name.toLowerCase().includes(this.filter.name_or_id.toLowerCase());
    return isId||isName;
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