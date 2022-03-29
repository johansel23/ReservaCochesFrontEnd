import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coche } from '../interfaces/coche';

const HOST = "http://localhost:8080/coches";

@Injectable({
  providedIn: 'root'
})
export class CocheService {

  constructor(private http: HttpClient) { }

  getCoches(){
    return this.http.get(`${HOST}`);
  }

  postCoches(coche: Coche){
    return this.http.post(`${HOST}`, coche);
  }
}
