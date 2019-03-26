export interface User {
    email: string; 
    name: string;
    date_joined: Date;
    last_active: Date;
    removed: {
      removed_by: string;
      removed_on: Date;
    }
    reviews_made: number;
  
  }