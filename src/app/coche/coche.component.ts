import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Coche } from '../interfaces/coche';
import { CocheService } from '../services/coche.service';
import { ModeloService } from '../services/modelo.service';

@Component({
  selector: 'app-coche',
  templateUrl: './coche.component.html',
  styleUrls: ['./coche.component.css']
})
export class CocheComponent implements OnInit {
  listaCoche: any = [];
  listaModelo: any = [];
  nuevoCoche: Coche = {
    id_modelo: 0,
    anyo: 0,
    color: '',
    combustible: '',
    transmision: false,
    precio: 0,
    image: '',
    is_disponible: false
  };

  constructor(private coches: CocheService, private modelo: ModeloService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerModelos();
  }

  obtenerCoches(){
    this.coches.getCoches().subscribe((datos:any) =>{
      this.listaCoche = datos;
      console.log(datos);
    });
  }

  obtenerModelos(){
    this.modelo.getModelos().subscribe((datos: any) =>{
      this.listaModelo = datos;
    });

  }

  insertarCoche(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger me-1'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estas a punto de insertar un coche!',
      text: "Estas seguro",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Insertar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Insertado',
          'Tu coche ha sido registrado',
          'success'
        )
        this.coches.postCoches(this.nuevoCoche).subscribe((datos:any) =>{
          // this.obtenerCoches();
          this.router.navigate(["/home"]);
        })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Operacion Cancelada :)',
          'error'
        )
      }
    })
  }

  //funcion para convertir una imagen a base 64
  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) return;
    let reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', (e) => {
      this.nuevoCoche.image = reader.result as string;
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
