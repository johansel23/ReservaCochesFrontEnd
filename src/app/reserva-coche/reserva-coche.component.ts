import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import Swal from 'sweetalert2';
import { Coche } from '../interfaces/coche';
import { ReservaCoche } from '../interfaces/reserva-coche';
import { ReservaCocheService } from '../services/reserva-coche.service';

@Component({
  selector: 'app-reserva-coche',
  templateUrl: './reserva-coche.component.html',
  styleUrls: ['./reserva-coche.component.css']
})
export class ReservaCocheComponent implements OnInit {
  listaReservas: any = [];
  coche: any;
  nuevaReserva: ReservaCoche ={
    id_coche: 0,
    fecha: '',
    id_usuario: 3,
    is_reservado: 'true'
  };

  constructor(private reserva: ReservaCocheService) { }

  ngOnInit(): void {
    this.coche = history.state;
    this.nuevaReserva.id_coche = this.coche.coche.id_coche;
  }

  obtenerReserva(){
    this.reserva.getReservaCoche().subscribe((datos:any) =>{
      this.listaReservas = datos;
    });
  }

  insertarReserva(){
    console.log(this.nuevaReserva);
    this.reserva.postReservaCoche(this.nuevaReserva).subscribe((datos:any)=>{
      Swal.fire({
        icon: 'success',
        title: 'Operacion creada',
        text: 'Añadido correctamente!',
      });
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
