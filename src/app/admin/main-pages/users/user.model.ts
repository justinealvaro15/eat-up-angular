export interface User {
    user_id: string; 
    first_name: string;
    last_name: string;
    photoUrl: string; 
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
    deactivated: {
      deactivated_by: string;
      deactivated_on: { //DATE
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
  user_id: string;
  first_name: string;
  last_name:string;
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