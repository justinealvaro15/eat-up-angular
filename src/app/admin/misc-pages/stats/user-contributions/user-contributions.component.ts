import {Component, OnInit, ViewChild, AfterViewInit, Input} from '@angular/core';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import {UsersService} from '../../../main-pages/users/users.service';
import {User} from '../../../main-pages/users/user.model';
import { Subscription } from 'rxjs';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { finalize,catchError, tap, startWith } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import {ActivatedRoute} from '@angular/router';
import {ReviewsService, FilterKeys} from '../../../../user/reviews/reviews.service';
import {Review} from '../../../../user/reviews/reviews.model';

export interface PeriodicElement {
  name: string;
  position: number;
  aveRating: number;
  totalReviews: number;
  addedMenuItems: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Maria Sofia Yangzon', aveRating: 1.79, totalReviews: 3, addedMenuItems:1},
  {position: 2, name: 'Justine Paul Alvaro', aveRating: 4.26, totalReviews: 2, addedMenuItems:4},
  {position: 3, name: 'Lois Anne Leal', aveRating: 4.5, totalReviews: 4, addedMenuItems: 2}/*,
  {position: 4, name: 'Rommel Feria', aveRating: 1.5, totalReviews: 23, addedMenuItems: 21},
  {position: 5, name: 'Wilson Tan', aveRating: 2.35, totalReviews: 32, addedMenuItems:22},
  {position: 6, name: 'Ligaya Leah Figueroa', aveRating: 3.6, totalReviews:32, addedMenuItems: 53},
  {position: 7, name: 'Edgardo Felizmeno', aveRating: 2.1, totalReviews:21, addedMenuItems: 12},
  {position: 8, name: 'Juan Felipe Coronel', aveRating: 5.0, totalReviews:21, addedMenuItems:8},
  {position: 9, name: 'Jerome Cary Beltran', aveRating: 1.2, totalReviews:21, addedMenuItems: 19},
  {position: 10, name: 'JayMar Soriano', aveRating: 2.4, totalReviews:12, addedMenuItems: 25},*/
];
/**
 * @title Sorting overview
 */
@Component({
  selector: 'app-user-contributions',
  templateUrl: './user-contributions.component.html',
  styleUrls: ['./user-contributions.component.css']
})
export class UserContributionsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['position', 'name', 'aveRating', 'totalReviews', 'addedMenuItems'];
  user: User;
  users: User[];
  dataSource : UsersTableDataSource;
  usersReviews: Review[];
  @Input() reviews: Review[];
  filter_reviews:Review[];
  getReviewsSubscription: Subscription;
  getUserSubscription:Subscription;
  getFilteredUserSubscription:Subscription;
  avgRatingOfUsers: any[]=[];
  numOfRatingOfUsers:any[]=[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private reviewsService: ReviewsService
  ) { 
  }

  ngOnInit() {

    this.user = this.route.snapshot.data["user"];
    this.dataSource = new UsersTableDataSource(this.usersService);
    this.dataSource.loadUsers();
    //this.dataSource.sort = this.sort;

    this.getReviewsSubscription = this.reviewsService.getAllReviews().subscribe((reviews) => {
      this.getReviews();
    });
    this.getUserSubscription = this.usersService.getUsersDisplay().subscribe((filter) => { 
      this.getFilteredUsers();
      this.getAvgRatingAndNumOfRatings();
    });
    this.getFilteredUsers();
    this.getReviews();
    //this.getAvgRatingAndNumOfRatings();
  
 
  
  }

  ngAfterViewInit() {
    this.paginator.page
            .pipe(
                startWith(null),
                tap(() => this.loadUsersPage())
            )
            .subscribe();
  }

  ngOnDestroy() {
    try {
      this.getUserSubscription.unsubscribe();
      this.getReviewsSubscription.unsubscribe();
    } catch { }
  }

  loadUsersPage() {
    this.dataSource.loadUsers(
      "",
      '',
      'asc',
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

   

  getFilteredUsers() {
    this.users = this.usersService.getFilteredUsers();  
  }

  getReviews() {
    this.reviews = this.reviewsService.getFilteredReviews();
    //console.log("review list: "+this.reviews[0]);
  }

  getFilteredReviews() {
    this.filter_reviews = this.reviewsService.getFilteredReviews();
   
  }

  getAvgRatingAndNumOfRatings() {
   
    var i;
    var users = this.usersService.getFilteredUsers();

    for (i=0;i<users.length;i++) { //this.users.length
      this.reviewsService.setFilter(FilterKeys.USER_ID,users[i].user_id);
      this.getFilteredReviews();
      this.avgRatingOfUsers.push(this.getAvg());
      this.numOfRatingOfUsers.push(this.filter_reviews.length);
    }

  
  }

  getAvg(): string{
    var sum = 0;
    var j = 0;
  
 
    for (j=0;j<this.filter_reviews.length;j++){
      sum = sum + this.filter_reviews[j].rating;
    }

  
    var avg = (sum/this.filter_reviews.length).toFixed(2);
    
    return avg;
  }

}


export class UsersTableDataSource implements DataSource<User> {
  private usersSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private usersService: UsersService
  ) {  }

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.usersSubject.complete();
    this.loadingSubject.complete();
  }

  loadUsers(user_id='', filter='',
              sortDirection= 'asc', pageIndex= 0, pageSize= 10) {

    this.loadingSubject.next(true);

    this.usersService.findUsers(user_id, filter, sortDirection,
         pageIndex, pageSize).pipe(
              catchError(() => of([])),
              finalize(() => this.loadingSubject.next(false))
         )
              .subscribe(users => this.usersSubject.next(users));
        
  } 
}