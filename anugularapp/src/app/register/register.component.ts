import { Component, OnInit ,Input, Inject} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from '../user.service';
import {FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  repeatFieldTextType!: boolean;
  FieldTextType!: boolean;
  defaultrole = "User";
  profileForm = this.fb.group({
    firstName: ['',Validators.required],
    lastName: ['',Validators.required],
    role: [''],
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    confirmPassword: ['',Validators.required]
  },{ 
    validators:MustMatch('password', 'confirmPassword')
  });

  submitted = false;
  showSucessMessage?: boolean;
  serverErrorMessages?: string;
  constructor(private fb: FormBuilder,private userservice?: UserService,
    public dialogRef?: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any) { }
  
  get f() { return this.profileForm.controls; }

  saveTutorial() {
    
    this.submitted = true;

    const datavalue = {
      firstName: this.profileForm.controls['firstName'].value,
      lastName: this.profileForm.controls['lastName'].value,
      role: this.defaultrole,
      email: this.profileForm.controls['email'].value,
      password: this.profileForm.controls['password'].value,
      

    };

    if (this.profileForm.invalid) {
        return;
    }
    console.log(this.profileForm.value)
    /*this.userservice?.create(this.profileForm.value)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.reloadPage();
        },
        error => {
          console.log(error);
        });
       alert('success');*/
       this.userservice?.postUser(datavalue).subscribe(
        res => {
          this.showSucessMessage= true;
          
          console.log(res)
          setTimeout(() => this.showSucessMessage= false, 4000);
          this.reloadPage();
        },
        err => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join('<br/>');
          }
          else
            this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        }
      );
      
  }

onReset() {
    this.submitted = false;
    this.profileForm.reset();
    this.serverErrorMessages = '';
}

reloadPage() {
  window.location.reload();
  
}

toggleRepeatFieldTextType() {
  this.repeatFieldTextType = !this.repeatFieldTextType;
}

toggleFieldTextType() {
  this.FieldTextType = !this.FieldTextType;
}

}

function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
  }
}
