import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const HOST = "http://localhost:8080/marcas";

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  constructor(private http: HttpClient) { }

  getModelos(){
    return this.http.get(`${HOST}`);
  }
}
