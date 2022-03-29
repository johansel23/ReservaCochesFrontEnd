import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showHiddenOptions: boolean = false;

  constructor(private usuarios : UsuariosService) { }

  ngOnInit(): void {
  }

  logout(){
    this.usuarios.logOut();
    this.showHiddenOptions = false;
  }

  isLogged(){
    return this.usuarios.isLogged();
  }

}
