import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservaCoche } from '../interfaces/reserva-coche';

const HOST = "http://localhost:8080/reservas";

@Injectable({
  providedIn: 'root'
})
export class ReservaCocheService {

  constructor(private http: HttpClient) { }

  getReservaCoche(){
    return this.http.get(`${HOST}`);
  }

  getReservaUsuario(id: number){
    return this.http.get(`${HOST}/idusuario/${id}`);
  }

  postReservaCoche(reserva: ReservaCoche){
    return this.http.post(`${HOST}`,reserva);
  }

  putReserva(reserva: ReservaCoche, id: number){
    return this.http.put(`${HOST}/${id}`,reserva);
  }

  deleteMarcas(id:number){
    return this.http.delete(`${HOST}/${id}`)
  }
}
