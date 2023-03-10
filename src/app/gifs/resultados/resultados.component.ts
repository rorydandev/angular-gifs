import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {

  

  get resultados (){
 
    return this.gifsService.resultado;
  }

  constructor (private gifsService : GifsService) { };

  

  datosTitulo(url : string){
    //let quitar = quitarEspacio.toString();
   
    let quitarEspacio = url.split(" " , 3).toString();
    let quitarComa = quitarEspacio.replaceAll(',', ' ');

    return quitarComa;
  }

}
