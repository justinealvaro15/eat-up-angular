export interface Review {
    user_id: string;
    fe_id: string;
    firstName: string;
    photoUrl: string;
    rating: number;
    review: string;
    date: Date | string;
}