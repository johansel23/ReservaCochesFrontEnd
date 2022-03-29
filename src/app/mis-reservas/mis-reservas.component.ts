import { Component, OnInit } from '@angular/core';
import { ReservaCocheService } from '../services/reserva-coche.service';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent implements OnInit {
  listaReserva: any = [];

  constructor(private misReservas: ReservaCocheService) { }

  ngOnInit(): void {
    this.obtenerMisReservas(3);
  }

  obtenerMisReservas(id:number){
    this.misReservas.getReservaUsuario(id).subscribe((datos: any) =>{
      this.listaReserva = datos;
      console.log(datos);
    });
  }

}
