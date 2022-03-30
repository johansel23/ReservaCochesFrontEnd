import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marca } from '../interfaces/marca';

const HOST = "http://localhost:8080/marcas";

@Injectable({
  providedIn: 'root',
})
export class MarcaService {
  constructor(private http: HttpClient) {}

  getMarcas(){
    return this.http.get(`${HOST}`);
  }

  postMarcas(marcas: Marca){
    return this.http.post(`${HOST}`,marcas);
  }

  deleteMarcas(id:number){
    return this.http.delete(`${HOST}/${id}`)
  }

  putMarcas(marca: Marca, id:number){
    return this.http.put(`${HOST}/${id}`, marca);
  }
}

