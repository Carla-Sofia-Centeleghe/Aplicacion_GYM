import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Decorador Injectable para poder inyectar el servicio en otros componentes
@Injectable({
  providedIn: 'root'
})
export class BuscarAlumnoService {
  url='/api';
  search_value=''
  page=1
  per_page=4

  constructor(
    private httpClient: HttpClient
  ) {}

    // Metodo que me permite asignar el string del valor a buscar en el backend
    retrieve_search_value(search: string){
      console.log('Response from service:', search);
      this.search_value= search;
    }

    retrieve_requested_page(inputpage: any, inputper_page: any){
      console.log('Requested page:', inputpage);
      console.log('Requested per_page:', inputper_page);
      this.page= inputpage;

    }

    // Metodo que me conecta el backend para traer el listado de alumnos GET
    getUsers() {
      let auth_token = localStorage.getItem('token')

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })                                                  
      return this.httpClient.get(this.url + '/usuariosalumnos?search='+this.search_value+'&per_page='+this.per_page+'&page='+this.page, {headers: headers});

    };
}
