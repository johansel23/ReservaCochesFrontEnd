import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  correo = "";
  password = "";


  constructor(private usuarios: UsuariosService, private router: Router) {}

  ngOnInit(): void {

  }

  login(){
    this.usuarios
      .postLogin({
        "correo": this.correo,
        "password": this.password
      })
      .subscribe((datos: any) => {
        console.log(datos);
        localStorage.setItem('token', datos.accessToken);
        this.router.navigate(["/home"]);
      });
  }
}
