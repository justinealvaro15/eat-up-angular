import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';

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
export class UserContributionsComponent {
  displayedColumns: string[] = ['position', 'name', 'aveRating', 'totalReviews', 'addedMenuItems'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
}