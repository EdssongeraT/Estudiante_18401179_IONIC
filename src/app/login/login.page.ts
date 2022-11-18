import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
   myForm:FormGroup;
   student:Student[];
   sLogin:Student;
  constructor(public fb: FormBuilder, studentService:StudentService,private router: Router) { 
    this.student = studentService.getStudents();
    this.sLogin={
      controlnumber: "",
        age: 0,
        career: "",
        curp: "",
        email: "",
        name: "",
        nip: 0,
        photo: ""
    }
  }
  ngOnInit() {
    this.myForm = this.fb.group({
      'controlnumber': ["",Validators.required],
      'password': ["",Validators.required]
    })
  }
  
  public ingresar(){
    
    for (let i = 0; i < this.student.length; i++) {
      if(this.student[i].controlnumber == this.sLogin.controlnumber && this.student[i].nip == this.sLogin.nip){
        this.goHome();
      }
    }
  }
  public goHome(){
    this.router.navigate(['/home']);
  }
}
