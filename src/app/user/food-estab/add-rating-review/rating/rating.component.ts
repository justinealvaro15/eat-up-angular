import { Component, OnInit, forwardRef, Input, HostBinding } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  providers: [
   {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true
    }
  ]

})

export class RatingComponent implements ControlValueAccessor{
  ratenum:number;
  stars: boolean[] = Array(5).fill(true);

    OnInit(){
      this.ratenum = 0;
    }
   // Allow the input to be disabled, and when it is make it somewhat transparent.
  @Input() disabled = false;
   @HostBinding('style.opacity')
   get opacity() {
     return this.disabled ? 1 : 1;
   }

   // Function to call when the rating changes.
   onChange = (rating: number) => {
   };

   // Function to call when the input is touched (when a star is clicked).
   onTouched = () => {
   };


   get value(): number {
     if(!this.disabled){
     return this.stars.reduce((total, starred) => {
       return total + (starred ? 1 : 0);
     }, 0);
     }
   }
   rate(rating: number) {
     if (!this.disabled) {
       this.writeValue(rating);
       
     }
   }

   // Allows Angular to update the model (rating).
   // Update the model and changes needed for the view here.
   writeValue(rating: number): void {
     if (!this.disabled) {
       this.stars = this.stars.map((_, i) => rating > i);
       this.onChange(this.value);
       this.ratenum = rating;
       //access rating here c
       console.log(this.ratenum);
     }

   }

   // Allows Angular to register a function to call when the model (rating) changes.
   // Save the function as a property to call later here.
   registerOnChange(fn: (rating: number) => void): void {
     this.onChange = fn;
   }

   // Allows Angular to register a function to call when the input has been touched.
   // Save the function as a property to call later here.
   registerOnTouched(fn: () => void): void {
     this.onTouched = fn;
   }

   // Allows Angular to disable the input.
   setDisabledState(isDisabled: boolean): void {
     this.disabled = isDisabled;


   }
 }
