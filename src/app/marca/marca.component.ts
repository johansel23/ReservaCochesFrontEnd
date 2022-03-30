import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
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
  id:number = 0;
  listaMarcas: any = [];
  //Lista para obtener las marcas
  mostrar: boolean = false;
  pageYoffset: number = 0;
  insertarOanadir: boolean = true;

  @HostListener('window:scroll', ['$event']) onScroll(){
    this.pageYoffset = window.pageYOffset;
  }

  constructor(private marcas: MarcaService, private scroll: ViewportScroller) { }

  ngOnInit(): void {
    this.obtenerMarcas();
  }

  scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
  }

  obtenerMarcas(){
    this.marcas.getMarcas().subscribe((datos:any) => {
      this.listaMarcas = datos;
      console.log(datos);
    })
  }

  eliminarMarca(id: number){
    Swal.fire({
      title: 'Estas Seguro de querer eliminar una marca?',
      text: "No podras deshacer esta accion",
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.marcas.deleteMarcas(id).subscribe((datos:any) =>{
          this.obtenerMarcas();
        })
        Swal.fire(
          'Eliminado!',
          'Tu Marca Ha sido eliminada.',
          'success'
        )
      }
    })
  }

  insertarMarca(){
    this.marcas.postMarcas(this.nuevaMarca).subscribe((datos: any) =>{
      if (this.insertarOanadir) {
        Swal.fire({
          icon: 'success',
          title: 'Operacion creada',
          text: 'Añadido correctamente!',
        })
        this.mostrar= false;
        this.obtenerMarcas();


      } else {
        Swal.fire({
          icon: 'success',
          title: 'Operacion Actualizada',
          text: 'Actualizado correctamente!',
        })
        this.mostrar= false;
        this.obtenerMarcas();
      }
    });
  }

  actualizarMarca(marca: any){
    this.scrollToTop();
    this.mostrar = true;
    this.insertarOanadir = false;
    this.nuevaMarca = marca;
    this.id = marca.id_marca;
    this.marcas.putMarcas(this.nuevaMarca, this.id).subscribe((datos:any) => {
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
    this.nuevaMarca = {nombre_marca: ""}
    if (this.mostrar) {
      this.mostrar = false;
      this.insertarOanadir = true;
    } else{
      this.mostrar = true;
      this.insertarOanadir = true;
    }
  }

}
