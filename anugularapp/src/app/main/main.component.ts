import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef}  from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';
import { ViewComponent } from '../view/view.component';

import { CreateComponent } from '../create/create.component';
import { UserService } from '../user.service';
import { Router } from "@angular/router";
import { ResumeService } from '../resume.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  userDetails : any;
  email?: string;

  rolevalue?:boolean;
  role1?:string;
  role2?:string;

  value: any;
  firstname?:string;
  lastname='';
  
  constructor(public dialog: MatDialog,private userService: UserService, private router: Router,private resumeService?: ResumeService,) {}

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      (res : any) => {
        this.userDetails = res['user'];
        if(this.userDetails.role == "User")
        { 
          this.role1= "user";
        this.resumeService?.getemail(this.userDetails.email)
        .subscribe(
         data => {
        this.value = data;
        console.log(this.value.firstname);
      },
      error => {
        console.log(error);
      });}

      if(this.userDetails.role == "admin" || this.userDetails.role == "manager")
        { 
          this.rolevalue= true;
          if(this.userDetails.role == "admin"){  this.role2= "admin";}
          this.resumeService?.getAll()
        .subscribe(
         data => {
        this.value = data;
        console.log(this.value.firstname);
      },
      error => {
        console.log(error);
      });}
        console.log(res);
      },
      
      err => { 
        console.log(err);
        
      }
    );

    

    
  }

  openDialog(user : any): void {
    //alert("Hi")
    
    let dialogRef = this.dialog.open(CreateComponent, {
      width: '900px',
      height:'700px',
      data: user
  
    });
    dialogRef.afterClosed().subscribe(result => {
      this.email = result;
    });
  
  }

  openDialogedit(user : any): void {
   
    let dialogref = this.dialog?.open(EditComponent, {
      width: '900px',
      height:'700px',
      data: user
    });

    dialogref?.afterClosed().subscribe(result => {
      console.log(result);
      });
  } 
   
  openDialogview(user : any): void {
   
    let dialogref = this.dialog?.open(ViewComponent, {
      width: '800px',
      height:'600px',
      data: user
    });

    dialogref?.afterClosed().subscribe(result => {
      console.log(result);
      });
  } 
   

  
  onLogout(){
    Swal.fire({
      title: 'Are you sure want to Logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
    this.rolevalue=false
    this.userService.deleteToken();
    this.router.navigate(['/']);
    console.log(this.userDetails);
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
  
      }
    })
  }

  deleteTutorial(_id: any) {
    Swal.fire({
      title: 'Are you sure want to delete?',
      text: 'You will not be able to recover later!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(_id)
    this.resumeService?.delete(_id)
      .subscribe(
        response => {
          console.log(response);
          this.reloadPage();
        },
        error => {
          console.log(error);
        });}
        else if (result.dismiss === Swal.DismissReason.cancel) {
  
        }
      })
        
  
  }
  reloadPage() {
    window.location.reload();
  }

}
