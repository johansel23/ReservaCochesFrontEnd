import { formatDate, ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
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
  mostrarActualizar: boolean = false;
  pageYoffset: number =0;
  idReserva: number = 0;
  nuevaReserva: ReservaCoche ={
    id_coche: 0,
    fecha: '',
    id_usuario: 0,
    is_reservado: ''
  }

  @HostListener('window:scroll', ['$event']) onScroll(){
    this.pageYoffset = window.pageYOffset;
  }

  dateDay = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  constructor(private misReservas: ReservaCocheService, private usuario: UsuariosService , private scroll: ViewportScroller) { }

  ngOnInit(): void {
    this.obtenerUsuario();

  }

  obtenerMisReservas(id:number){
    this.misReservas.getReservaUsuario(id).subscribe((datos: any) =>{
      this.listaReserva = datos;
    });
  }

  scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
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

  insertarReserva(){
    Swal.fire({
      icon: 'success',
      title: 'Operacion Actualizada',
      text: 'Actualizado correctamente!',
    })
    this.misReservas.postReservaCoche(this.nuevaReserva).subscribe((datos:any)=>{
      this.mostrarActualizar= false;
      this.nuevaReserva ={
        id_coche: 0,
        fecha: '',
        id_usuario: 0,
        is_reservado: ''
      }
    });
  }

  updateReserva(Reserva: any){
    this.scrollToTop();
    this.mostrarActualizar = true;
    this.idReserva = Reserva.id_reserva;
    this.nuevaReserva = Reserva;
    this.misReservas.putReserva(this.nuevaReserva, this.idReserva).subscribe((datos: any) => {

    });
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }

  // actualizarMarca(marca: any){
  //   this.scrollToTop();
  //   this.mostrar = true;
  //   this.insertarOanadir = false;
  //   this.nuevaMarca = marca;
  //   this.id = marca.id_marca;
  //   this.marcas.putMarcas(this.nuevaMarca, this.id).subscribe((datos:any) => {
  //     this.obtenerMarcas();
  //   });
  // }

}
