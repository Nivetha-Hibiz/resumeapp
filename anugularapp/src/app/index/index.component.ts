import { Component, OnInit ,Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import {MatDialog, MatDialogRef}  from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { Router } from "@angular/router";


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent  {

   
  constructor(public dialog: MatDialog,private router: Router) {}
  openDialog(): void {
   
    let dialogref = this.dialog.open(RegisterComponent, {
      width: '700px',
      height:'600px',
    });

    dialogref.afterClosed().subscribe(result => {
      console.log(result);
      });
  
  }

  onLogin(){
    this.router.navigate(['/login']);
  }

}
