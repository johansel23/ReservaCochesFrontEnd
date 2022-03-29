import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import Swal from 'sweetalert2';
import { Marca } from '../interfaces/marca';
import { MarcaService } from '../services/marca.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {
  //creamos la variable que va a guardar las marcas que vienen del back
  nuevaMarca: Marca ={nombre_marca:''};
  listaMarcas: any = [];
  //Lista para obtener las marcas
  mostrar: boolean = false;

  constructor(private marcas: MarcaService) { }

  ngOnInit(): void {
    this.obtenerMarcas();
  }

  obtenerMarcas(){
    this.marcas.getMarcas().subscribe((datos:any) => {
      this.listaMarcas = datos;
      console.log(datos);
    })
  }

  eliminarMarca(id: number){
    this.marcas.deleteMarcas(id).subscribe((datos:any) =>{
      this.obtenerMarcas();
    })
  }

  insertarMarca(){
    this.marcas.postMarcas(this.nuevaMarca).subscribe((datos: any) =>{
      Swal.fire({
        icon: 'success',
        title: 'Operacion creada',
        text: 'Añadido correctamente!',
      })
      this.obtenerMarcas();
    });
  }

  //Funcion para la validacion de los formularios
  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }

  cambiar(){
    if (this.mostrar) {
      this.mostrar = false;
    } else{
      this.mostrar = true;
    }
  }

}
