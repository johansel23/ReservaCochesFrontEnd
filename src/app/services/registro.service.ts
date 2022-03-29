import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registro } from '../interfaces/registro';

const HOST = "http://localhost:8080/usuarios"
@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient) { }

  postReservaCoche(registro: Registro){
    return this.http.post(`${HOST}`,registro);
  }
}
