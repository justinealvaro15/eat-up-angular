import {  OnInit, Input, Injectable,EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { User } from "./admin/main-pages/users/user.model";
import { UsersService} from "./admin/main-pages/users/users.service";
import {PageViews} from './page-views.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService implements OnInit {
  public  user: SocialUser;
  public loggedIn: boolean;

  ngOnInit() {
  	this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
   
  }

  constructor(
    private authService: AuthService,
    private usersService:UsersService,
    private http: HttpClient,
    ) { 
      this.updatePageViews();
    }
    filter = {
      page_name: ''
    }
  private _pageviews: BehaviorSubject<PageViews[]> = new BehaviorSubject<PageViews[]>([]);
  filterChanged = new EventEmitter();

   setFilter(key: FilterKeys, filterValue: string) {
      this.filter[key] = filterValue;
      this.filterChanged.emit(this.filter);
    }

  setUser(user) {
    this.user = user;
  }
  getUser():SocialUser {
    //window.alert("in service "+this.user);
    return this.user;
  }

 
  getPageView(): BehaviorSubject<PageViews[]>{ //G
    return this._pageviews;
  }

  getTotalPageViews() { 
    return this.http.get<PageViews[]>('http://localhost:3000/api/page_views');
  }
  
  updatePageViews() { 
    console.log(this.getTotalPageViews().toPromise()); //ITS IN HERE SO FAR
    this.getTotalPageViews().toPromise().then((pages)=>{
        console.log(this._pageviews.next(pages));
    });
  }

  getPageViews():PageViews[] { //get list of users. is in . G
    console.log("ingetPageViews "+this._pageviews.getValue()); //WHY IS IT EMPTY
    return this._pageviews.getValue().filter((page)=> { //Server.js returns it right
      return this.isPageNameMatch(page) ;
     });
  }

  incTotalPageViews(pagename:string) {
    return this.http.put<PageViews>(`http://localhost:3000/api/page_views/${pagename}`,1);
  }

  private isPageNameMatch(page:PageViews):boolean { //works on test
    console.log("NANNN");
    if (!this.filter.page_name) {
      console.log("nani"); //also not executed
      return true;
    }
    const isPageName = page.name === this.filter.page_name;
    console.log("in isPageName"); //NOT EXECUTED
    return isPageName;
  }

 

}

 
export enum FilterKeys {
  Page_Name='page_name'
}
