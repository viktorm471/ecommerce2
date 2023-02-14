import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
const VALIDATORS_MESSAGES:any={
  required: 'This field is required',
  email: 'Please enter a valid email address',
  minlength: 'Please enter at least 6 characters',
  maxlength: 'Please enter no more than 12 characters',
  pattern: 'Please enter a valid value',
  notMatch: "the password doesn't match"
}


@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnChanges, OnInit{
  @Input()
  control!: AbstractControl;

  @Input()
  showErrorsWhen: boolean = true;

  errorMessages: string[] = [];

  ngOnInit(): void {
    this.control.statusChanges.subscribe(status => {
      this.checkValidation();
    })

    this.control.valueChanges.subscribe(status => {
      this.checkValidation();
    })
  }

ngOnChanges(changes: SimpleChanges): void {
  this.checkValidation();
};

checkValidation(){
  const errors = this.control.errors;
  if(!errors){
    this.errorMessages= [];
    return
  }


   this.errorMessages = Object.keys(errors).map(key => VALIDATORS_MESSAGES[key]);

}

}
