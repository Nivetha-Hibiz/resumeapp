import { Component, OnInit , Inject ,Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators ,FormArray, FormControl} from '@angular/forms';
import { ResumeService } from '../resume.service';
import { CollegeService } from '../college.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
 
  FieldTextType!: boolean;
  public textvalue?: string;
  
  districts : any;
  states : any;
  values  : any;
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


  submitted = false;
  firstname?:'';
  isLinear = true;
  personalFormGroup!: FormGroup;
  educationFormGroup!: FormGroup;
  exFormGroup!:FormGroup;
  skillFormGroup!:FormGroup;
  emailvalue?: string;

  constructor(private _formBuilder: FormBuilder,private resumeService?: ResumeService,private taskService?: CollegeService,

    public dialogRef?: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any) { }

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
      sslcMark: ['',[Validators.required,Validators.maxLength(3), Validators.minLength(2),Validators.max(100), Validators.min(10)]],
      hscSchoolName: [''],
      hscYear: ['',Validators.required],
      hscMark: ['',[Validators.required,Validators.maxLength(3), Validators.minLength(2),Validators.max(100), Validators.min(10)]],
      colname: [''],
      collegeDegree: [''],
      collegeYear: ['',Validators.required],
      collegeMark: ['',[Validators.required,Validators.maxLength(3), Validators.minLength(2),Validators.max(100), Validators.min(10)]],
      

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
    this.taskService?.state()
    .subscribe(
      response => {
        this.states=response;
        this.states.sort();
       
        
        
      },
      error => {
       console.log(error);
      }
      );

  }

  get f() { return this.personalFormGroup.controls; }
  get e() { return this.educationFormGroup.controls; }


  save(){

    this.submitted = true;
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
      collegeName: this.educationFormGroup.controls['colname'].value,
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


  
  savestate(){
    const data={
      state:this.educationFormGroup.controls['colname'].value,
    }
    console.log(data)
    this.taskService?.district(data)
      .subscribe(
        response => {
          this.districts=response;
          this.districts.sort();
         
          
          
        },
        error => {
         console.log(error);
        }
        );
  }
  
  savebutton()
  {
    const data={
      district:this.educationFormGroup.controls['colname'].value,
    }
    
    this.taskService?.create(data)
      .subscribe(
        response => {
          this.values=response;
          this.values.sort();
          
          
          
        },
        error => {
         console.log(error);
        }
        );
  }

  
  savevalue(){
    if(this.textvalue == "Others")
    {
      console.log(this.FieldTextType)
      this.FieldTextType = !this.FieldTextType;
    }
  }




  }








