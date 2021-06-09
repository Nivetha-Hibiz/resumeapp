import { Component, OnInit ,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor( public dialogRef?: MatDialogRef<ViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any) { }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef?.close();
  }

}
