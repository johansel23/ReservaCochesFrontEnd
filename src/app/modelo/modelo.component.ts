import { Component, OnInit} from '@angular/core';
import { NgModel } from '@angular/forms';
import Swal from 'sweetalert2';
import { Modelo } from '../interfaces/modelo';
import { MarcaComponent } from '../marca/marca.component';
import { MarcaService } from '../services/marca.service';
import { ModeloService } from '../services/modelo.service';

@Component({
  selector: 'app-modelo' ,
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css']
})
export class ModeloComponent implements OnInit {
  listaModelos: any = [];
  listaMarcas: any = [];
  nuevoModelo: Modelo ={id_marca: '', nombre_modelo:''};
  mostrar: boolean = false;

  constructor(private modelo: ModeloService , private marcas: MarcaService) { }

  ngOnInit(): void {
    this.obtenerModelos();
    this.obtenerMarcas();
  }

  obtenerModelos(){
    this.modelo.getModelos().subscribe((datos: any) =>{
      this.listaModelos = datos;
      console.log(datos);
    });

  }

  obtenerMarcas(){
    this.marcas.getMarcas().subscribe((datos:any) => {
      this.listaMarcas = datos;
      console.log(datos);
    })
  }

  insertarModelo(){
    this.modelo.postModelos(this.nuevoModelo).subscribe((datos: any) =>{
      Swal.fire({
        icon: 'success',
        title: 'Operacion creada',
        text: 'Añadido correctamente!',
      })
      this.obtenerModelos();
    });

  }

  cambiar(){
    if (this.mostrar) {
      this.mostrar = false;
    } else {
      this.mostrar = true;
    }

  }

  //Funcion para la validacion de los formularios
  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }

}
