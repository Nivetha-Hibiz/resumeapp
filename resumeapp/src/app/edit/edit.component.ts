import { Component, OnInit , Inject ,Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators ,FormArray, FormControl} from '@angular/forms';
import { ResumeService } from '../resume.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
 

  allyears = [
    {name: '1980'},{name: '1981'},{name: '1982'},{name: '1983'},{name: '1984'},{name: '1985'},{name: '1986'},{name: '1987'},{name: '1988'},{name: '1989'},{name: '1990'},
    {name: '1991'},{name: '1992'},{name: '1993'},{name: '1994'},{name: '1995'},{name: '1996'},{name: '1997'},{name: '1998'},{name: '1999'},{name: '2000'},
    {name: '2001'},{name: '2002'},{name: '2003'},{name: '2004'},{name: '2005'},{name: '2006'},{name: '2007'},{name: '2008'},{name: '2009'},{name: '2010'},
    {name: '2011'},{name: '2012'},{name: '2013'},{name: '2014'},{name: '2015'},{name: '2016'},{name: '2017'},{name: '2018'},{name: '2019'},{name: '2020'},
    {name: '2021'},{name: '2022'},{name: '2023'}
  ];

  degree = [
    {name: 'B.Tech(IT)'},
    {name: 'B.E(CSE)'},
    {name: 'B.E(ECE)'},
    {name: 'B.E(EEE)'},
    {name: 'B.E/B.Tech(Others)'},
    {name: 'BCA'},
    {name: 'MCA'},
    {name: 'B.sc'},
    {name: 'M.sc'},
    {name: 'Others'},
  ];



  firstname?:'';
  isLinear = true;
  personalFormGroup!: FormGroup;
  educationFormGroup!: FormGroup;
  exFormGroup!:FormGroup;
  skillFormGroup!:FormGroup;
  emailvalue?: string;

  constructor(private _formBuilder: FormBuilder,private resumeService?: ResumeService,

    public dialogRef?: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any) { }

  ngOnInit(): void {
    this.personalFormGroup = this._formBuilder.group({
      _id:[''],
      firstname: [''],
      lastname: [''],
      email: [''],
      mobile: [''],
      gender:['']
    });
    this.educationFormGroup = this._formBuilder.group({
      sslcSchoolName: [''],
      sslcYear: [''],
      sslcMark: [''],
      hscSchoolName: [''],
      hscYear: [''],
      hscMark: [''],
      collegeName: [''],
      collegeDegree: [''],
      collegeYear: [''],
      collegeMark: ['']

    });
    this.exFormGroup = this._formBuilder.group({
      companyName: [''],
      startDate: [''],
      endDate: [''],
      description: ['']

    });
    this.skillFormGroup = this._formBuilder.group({
      languages: [''],
      technicalSkills: ['']
    
    });

  }

  save(){


    const datavalue = {
      firstname: this.personalFormGroup.controls['firstname'].value,
      lastname: this.personalFormGroup.controls['lastname'].value,
      email: this.personalFormGroup.controls['email'].value,
      mobile: this.personalFormGroup.controls['mobile'].value,
      gender: this.personalFormGroup.controls['gender'].value,
      sslcSchoolName: this.educationFormGroup.controls['sslcSchoolName'].value,
      sslcYear: this.educationFormGroup.controls['sslcYear'].value,
      sslcMark: this.educationFormGroup.controls['sslcMark'].value,
      hscSchoolName: this.educationFormGroup.controls['hscSchoolName'].value,
      hscYear: this.educationFormGroup.controls['hscYear'].value,
      hscMark: this.educationFormGroup.controls['hscMark'].value,
      collegeName: this.educationFormGroup.controls['collegeName'].value,
      collegeDegree: this.educationFormGroup.controls['collegeDegree'].value,
      collegeYear: this.educationFormGroup.controls['collegeYear'].value,
      collegeMark: this.educationFormGroup.controls['collegeMark'].value,
      companyName: this.exFormGroup.controls['companyName'].value,
      startDate: this.exFormGroup.controls['startDate'].value,
      endDate: this.exFormGroup.controls['endDate'].value,
      description: this.exFormGroup.controls['description'].value,
      languages: this.skillFormGroup.controls['languages'].value,
      technicalSkills: this.skillFormGroup.controls['technicalSkills'].value,

    };
    
    // this.resumeService?.setEmail(this.personalFormGroup.controls['email'].value);
    this.resumeService?.update(this.data._id, datavalue)
      .subscribe(
        response => {
          console.log(response);
          this.reloadPage();
        },
        error => {
          console.log(error);
        });
       alert('success');
  }
  reloadPage() {
    window.location.reload();
  }
  onCancel(): void {
    this.dialogRef?.close();
  }


  }








