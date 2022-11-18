import { Injectable } from '@angular/core';
import { Student } from "../models/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[];

  constructor() {
    this.students = [
      {
        controlnumber: "18401179",
        age: 22,
        career: "ISC",
        curp: "PETE000609HNTRLDA1",
        email: "edgeperezto@ittepic.edu.mx",
        name: "Edsson Gerardo Perez Tolentino",
        nip: 1234,
        photo: "https://picsum.photos/id/1/200/300"
      },
      {
        controlnumber: "18401183",
        age: 22,
        career: "ISC",
        curp: "TSFG9991HNTRLDA1",
        email: "atraricoma@ittepic.edu.mx",
        name: "Atxel Rafale Rico Macias",
        nip: 4321,
        photo: "https://picsum.photos/id/1/200/300"
      }
    ];
  }

  public getStudents(): Student[] {
    return this.students;
  }
  public getSStudents(cn: string): Student {
    let item: Student;
    item = this.students.find((student) => {
      return student.controlnumber === cn;
    });
    return item;
  }

  public removeStudent(pos: number): Student[] {
    this.students.splice(pos, 1);
    return this.students;
  }

  public newStudent(student: Student) {
    this.students.push(student);
  }

  public updateStudent(student: Student, pos:number){
    this.students[pos]=student;
  }
}
