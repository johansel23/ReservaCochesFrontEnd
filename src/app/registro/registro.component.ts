import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import Swal from 'sweetalert2';
import { Registro } from '../interfaces/registro';
import { RegistroService } from '../services/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  nuevoRegistro: Registro ={
    nombre: '',
    correo: '',
    password: '',
    administrador: false
  }

  constructor(private registro: RegistroService) { }

  ngOnInit(): void {
  }

  crearRegistro(){
    console.log(this.nuevoRegistro);
    this.registro.postUsuario(this.nuevoRegistro).subscribe((datos:any)=>{
      Swal.fire({
        icon: 'success',
        title: 'Usuario Creado',
        text: 'Añadido correctamente!',
      })
    });
  }

  //Funcion para la validacion de los formularios
  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }

}
