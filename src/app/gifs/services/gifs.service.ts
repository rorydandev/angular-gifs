import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {

  private apiKey: string = 'hjEMDKdt3m9rXwUrUbXGtp5VZwEZlHaz';

  private servicioUrl : string = "https://api.giphy.com/v1/gifs";

  private _historial: string[] = [];

  public resultado: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    //Le indica que si el dato es vacion se obtiene un arreglo vacio
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultado = JSON.parse(localStorage.getItem('resultado')!) || [];

    /*if (localStorage.getItem("historial")) {
      this._historial = JSON.parse(localStorage.getItem("historial")!);
    }
    */
  }

  buscarGifs(query: string) {

    query = query.trim().toLowerCase();
    
    if (!this._historial.includes(query)) {

      this._historial.unshift(query);

      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','25')
    .set('q',query);
    

    this.http
      .get<SearchGifsResponse>(
        `${this.servicioUrl}/search?`,{params}
      )
      .subscribe((resp) => {
        //console.log(resp.data[0].images.original.mp4);
        console.log(resp.data);

        this.resultado = resp.data;

        localStorage.setItem('resultado', JSON.stringify(this.resultado));
      });
  }

  



  /*
  //Con el asyn await 
  async buscarGifs(query : string){
    
    query = query.trim().toLowerCase();

    
    if (!this._historial.includes(query)) {
      
      this._historial.unshift(query);
      
      this._historial = this._historial.splice(0,10);
    }

   
    
    const res = await fetch('https://api.giphy.com/v1/gifs/search?api_key=hjEMDKdt3m9rXwUrUbXGtp5VZwEZlHaz&q=dragon ball z&limit=10');
    
    const data = await res.json();

    console.log(data);
    
   // console.log(this._historial);
  }
  */

  /* 
  //Sin el asyn await 
  buscarGifs(query : string){
    
    query = query.trim().toLowerCase();

    
    if (!this._historial.includes(query)) {
      
      this._historial.unshift(query);
      
      this._historial = this._historial.splice(0,10);
    }

   
    
    fetch('https://api.giphy.com/v1/gifs/search?api_key=hjEMDKdt3m9rXwUrUbXGtp5VZwEZlHaz&q=dragon ball z&limit=2')
    .then(res =>{
      res.json().then(data => {
        console.log(data);
        
      })
    })
    
   // console.log(this._historial);
  }
  */
}
