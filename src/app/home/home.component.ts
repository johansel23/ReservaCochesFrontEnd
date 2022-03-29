import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ReservaCoche } from '../interfaces/reserva-coche';
import { CocheService } from '../services/coche.service';
import { ReservaCocheService } from '../services/reserva-coche.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listaCoche: any = [];

  constructor(private usuarios: UsuariosService , private coches: CocheService) { }

  ngOnInit(): void {
    this.obtenerCochesHome();
  }

  obtenerCochesHome(){
    this.coches.getCoches().subscribe((datos:any) =>{
      this.listaCoche = datos;
      console.log(datos);
    });
  }

  isLogged(){
    return this.usuarios.isLogged();
  }



}
