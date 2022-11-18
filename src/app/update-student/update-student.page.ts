import { Component, OnInit } from '@angular/core';
import { Student } from "../models/student";
import { StudentService } from '../services/student.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.page.html',
  styleUrls: ['./update-student.page.scss'],
})
export class UpdateStudentPage implements OnInit {
  public student: Student;
  public myForm:FormGroup;
  public validationMessages: Object;
  public careers:string[]=['ISC','IQ','IBQ','ARQ','IC','IG','IE','IM','LA','IT'];
  public sUpdate: Student[];
  constructor(private studentService:StudentService, private aRoute: ActivatedRoute, private fb:FormBuilder,
    private router: Router){ 
    this.sUpdate = this.studentService.getStudents();
 
  }
  
  ngOnInit() {
    this.aRoute.queryParams.subscribe((params)=>{
      this.student = this.studentService.getSStudents(params.controlnumber);
    });

    this.myForm = this.fb.group({
      controlNumber:["",Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(8), Validators.pattern('^[0-9]+$')])],
      name:["",Validators.required],
      curp:["",Validators.compose([Validators.required, Validators.pattern('^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}'+
      '(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])'+
      '[HM]{1}'+
      '(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)'+
      '[B-DF-HJ-NP-TV-Z]{3}'+
      '[0-9A-Z]{1}'+
      '[0-9]{1}$')])],
      'age':["",Validators.compose([Validators.required,Validators.min(18)])],
      'nip':["",Validators.compose([Validators.required,Validators.min(10),Validators.max(10000)])],
      'email':["",Validators.compose([Validators.required,Validators.email])],
      'career':["",Validators.required],
      'photo':["", Validators.compose([Validators.required,Validators.pattern('^(ftp|http|https){1}'+
      '[:]{1}'+
      '[/]{2}'+
      '[a-zA-Z0-9@:%._\+~#=]{2,256}'+
      '[.]{1}'+
      '[a-z]{2,6}'+
        '[a-zA-Z0-9@:%._\+~#&?=/-]*$')])]
    });
    this.validationMessages = {
      'controlNumber': [
        {type: 'required', message:"Número de control obligatorio"},
        {type: 'minlength', message:"El Número de control 8 carácteres mínimo"},
        {type: 'maxlength', message:"El Número de control 8 carácteres maximo"},
        {type: 'pattern', message:"Solo números"}        
      ],
      'name': [
        {type: 'required', message:"Nombre obligatorio"}
      ],
      'curp': [
        {type: 'required', message: "CURP obligatoria "},
        {type: 'pattern', message:"Formato incorrecto"}
      ],
      'age': [
        {type: 'required', message: "Edad obligatoria "},
        {type: 'min', message: "La edad minima es 18"}
      ],
      'nip': [
        {type: 'required', message: "NIP obligatorio"},
        {type: 'min', message: "NIP incorrecto"},
        {type: 'max', message: "NIP incorrecto"}
      ],
      'email': [
        {type: 'required', message: "Correo Obligatorio"},
        {type: 'email', message: "Correo invalido"}
      ],
      'career':[
        {type: 'required', message: "Carrera obligatoria"}
      ],
      'photo': [
        {type: 'required', message: "url obligatoria "},
        {type: 'pattern', message:"URL incorrecta (ej. https://www.picsum.photos/id/1/200/300)"}
      ]
    }
  }
  public updateStudent(){
    for (let i = 0; i < this.sUpdate.length; i++) {
      if(this.sUpdate[i].controlnumber.includes(this.student.controlnumber)){
        this.studentService.updateStudent(this.student,i);
      }
    }
    this.router.navigate(['/home']);
  }
}
