export interface User {
    email: string; 
    name: string;
    photo: string; 
    date_joined: { //DATE
      year: number;
      month: number;
      day: number;
      hour: number;
      minute: number;
      second: number;
    };
    last_active: { //DATE
      year: number;
      month: number;
      day: number;
      hour: number;
      minute: number;
      second: number;
    };
    removed: {
      removed_by: string;
      removed_on: { //DATE
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
      };
    }
    reviews_made: number;
    active:boolean;
    isAdmin: boolean;
  }
export interface Admin {
  email: string;
  name: string;
  //photoUrl: string;
  admin_since: { //DATE
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  };
}