import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ReservaCoche } from '../interfaces/reserva-coche';
import { ReservaCocheService } from '../services/reserva-coche.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent implements OnInit {
  listaReserva: any = [];
  nuevaReserva: ReservaCoche ={
    id_coche: 0,
    fecha: '',
    id_usuario: 0,
    is_reservado: ''
  }

  constructor(private misReservas: ReservaCocheService, private usuario: UsuariosService ) { }

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  obtenerMisReservas(id:number){
    this.misReservas.getReservaUsuario(id).subscribe((datos: any) =>{
      this.listaReserva = datos;
      console.log(datos);
    });
  }

  obtenerUsuario(){
    this.usuario.getCurrentUser().subscribe((datos: any) =>{
      this.obtenerMisReservas(datos);
    })
  }

  eliminarReserva(id: number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger me-1'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Quieres eliminar una Reserva?',
      text: "Estas a punto de eliminar una reserva!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No!!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'Tu reserva ha sido Eliminado :(',
          'success'
        )
        this.misReservas.deleteMarcas(id).subscribe((datos:any) =>{
          this.obtenerUsuario();
        })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.obtenerUsuario();
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Operacion Cancelada :)',
          'error'
        )
      }
    })
  }

  updateReserva(idReserva: number){
    this.misReservas.putReserva(this.nuevaReserva, idReserva).subscribe((datos: any) => {
      
    });
  }

}
