import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

const HOST= "http://localhost:8080/auth/login";



@Injectable({

  providedIn: 'root'

})

export class UsuariosService {
  constructor(private http:HttpClient) { }
  
  postLogin(usuario: any) {return this.http.post(`${HOST}`, usuario)}

  logOut(){
    localStorage.removeItem("token");
  }

  isLogged(){
    return localStorage.getItem("token")!=null;
  }

}
