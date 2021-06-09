import { Component, OnInit ,Output,  EventEmitter,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormArray, FormControl} from '@angular/forms';
import { ResumeService } from '../resume.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  
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



  personalvalue: any;
  educationvalue:any;
  workvalue:any;
  skillvalue:any;
  isLinear = true;
  personalFormGroup!: FormGroup;
  educationFormGroup!: FormGroup;
  exFormGroup!:FormGroup;
  skillFormGroup!:FormGroup;
  emailvalue?: string;
  serverErrorMessages?: string;
  constructor(private _formBuilder: FormBuilder,private resumeService?: ResumeService,
    

    public dialogRef?: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any) {
      this.personalvalue = JSON.parse(localStorage.getItem('per' + this.data.email)!)
      this.educationvalue = JSON.parse(localStorage.getItem('edu' + this.data.email)!)
      this.workvalue = JSON.parse(localStorage.getItem('work' + this.data.email)!)
      this.skillvalue = JSON.parse(localStorage.getItem('skill' + this.data.email)!)
     }

  ngOnInit(): void {
    this.personalFormGroup = this._formBuilder.group({
      _id:[''],
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      email: [{value: '', disabled: true}],
      mobile: ['',[Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]],
      gender:['',Validators.required]
    });
    this.educationFormGroup = this._formBuilder.group({
      sslcSchoolName: [''],
      sslcYear: ['',Validators.required],
      sslcMark: ['',Validators.required],
      hscSchoolName: [''],
      hscYear: ['',Validators.required],
      hscMark: ['',Validators.required],
      collegeName: [''],
      collegeDegree: [''],
      collegeYear: ['',Validators.required],
      collegeMark: ['',Validators.required]

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


    console.log(this.data.email)
    const datavalue = {
      firstname: this.personalFormGroup.controls['firstname'].value,
      lastname: this.personalFormGroup.controls['lastname'].value,
      email: this.data.email,
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
    console.log(datavalue);
    // this.resumeService?.setEmail(this.personalFormGroup.controls['email'].value);
    this.resumeService?.create(datavalue)
      .subscribe(
        response => {
          console.log(response);
          this.resumeService?.setEmail(response)
          this.reloadPage();
        },
        error => {
          if (error.status === 422) {
            this.serverErrorMessages = error.error.join('<br/>');
          }
          else
            this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        }
        );
       alert('success');
  }
  reloadPage() {
    window.location.reload();
  }
  onCancel(): void {
    this.dialogRef?.close();
  }
  
 

  SubmitPersonal(){
    localStorage.setItem('per' + this.data.email, JSON.stringify(this.personalFormGroup.value));
   
  }
  
  SubmitEducation(){
    localStorage.setItem('edu' + this.data.email, JSON.stringify(this.educationFormGroup.value));
   
  }

  SubmitWork(){
    localStorage.setItem('work' + this.data.email, JSON.stringify(this.exFormGroup.value));
   
  }

  SubmitSkill(){
    localStorage.setItem('skill' + this.data.email, JSON.stringify(this.skillFormGroup.value));
   
  }

  Submitvalue(){
    this.SubmitPersonal();
    this.SubmitEducation();
    this.SubmitWork();
    this.SubmitSkill();
    this.onCancel();

  }

 

}


