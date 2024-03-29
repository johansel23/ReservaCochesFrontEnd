import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Modelo } from '../interfaces/modelo';

const HOST = "http://localhost:8080/modelos";

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  constructor(private http: HttpClient) { }

  getModelos(){
    return this.http.get(`${HOST}`);
  }

  postModelos(modelos: Modelo){
    return this.http.post(`${HOST}`, modelos);

  }
}
