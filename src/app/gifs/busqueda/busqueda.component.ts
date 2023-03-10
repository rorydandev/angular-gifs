import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {
  
  

  //Para que busque la referencia que se iso en el html 
  // el ! = se asegura que el valor no es nulo

  @ViewChild('txtbuscar')txtbuscar! : ElementRef<HTMLInputElement> ;


 constructor ( private gifsService : GifsService) {};


  buscar(){

    const valor = this.txtbuscar.nativeElement.value;

    //console.log(valor);

    if (valor.trim().length === 0 ) {
      return ;
    }

    this.gifsService.buscarGifs(valor);

    this.txtbuscar.nativeElement.value = "";

  }
}
