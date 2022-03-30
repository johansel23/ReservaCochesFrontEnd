import { Component, HostListener, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Coche } from '../interfaces/coche';
import { ReservaCoche } from '../interfaces/reserva-coche';
import { ReservaCocheService } from '../services/reserva-coche.service';
import { UsuariosService } from '../services/usuarios.service';

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
    id_usuario: 0,
    is_reservado: 'true'
  };




  constructor(private reserva: ReservaCocheService, private router: Router, private usuario: UsuariosService) { }

  ngOnInit(): void {
    this.coche = history.state;
    this.nuevaReserva.id_coche = this.coche.coche.id_coche;
    this.obtenerUsuario();
  }


  obtenerReserva(){
    this.reserva.getReservaCoche().subscribe((datos:any) =>{
      this.listaReservas = datos;
    });
  }

  obtenerUsuario(){
    this.usuario.getCurrentUser().subscribe((datos: any) =>{
      this.nuevaReserva.id_usuario = datos;
    })
  }

  insertarReserva(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger me-1'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estas a punto de reservar un coche!',
      text: "Estas seguro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Reservar',
      cancelButtonText: 'No, cancelar Reserva',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Reservado!',
          'Tu coche ha sido reservado',
          'success'
        )
        this.reserva.postReservaCoche(this.nuevaReserva).subscribe((datos:any)=>{
          this.router.navigate(["mis-reservas"]);
        });
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

  //Funcion para la validacion de los formularios
  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }

}
