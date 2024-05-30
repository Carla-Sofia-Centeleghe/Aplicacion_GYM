import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, take } from 'rxjs'; // Deja pasar informacion de un lado a otro 

// Decorador Injectable para poder inyectar el servicio en otros componentes
@Injectable({
  providedIn: 'root'
})
export class AbmRutinaService {
  url='/api';
  student_id=''

  constructor(
    private httpClient: HttpClient
  ) { }

   // Metodo que me permite asignar el string del valor a buscar en el backend, trae el id del estudainte para poder ver sus datos
   retrieve_alumno_id(search: string){
    console.log('Response from service:', search);
    this.student_id= search;
  }

  getmaxid(){
    let auth_token = localStorage.getItem('token')
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    // Busco el maximo id de rutina que exista
    return this.httpClient.get(this.url + '/id_planificacion?get_max_id=0', {headers: headers});

  }

  // Metodo que me permite usar el recurso GET para obtener la rutina
  getRutina() {
    let auth_token = localStorage.getItem('token')

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.get(this.url + '/planificaciones'+this.student_id, {headers: headers})
  };

  // Metodo que me permite usar el recurso PUT para editar la rutina
  putRutina(rutinaId: number, rutinadata: any): Observable<any> {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    // Editar rutina segun el id especificado
    return this.httpClient.put(`${this.url}/planificacion/${rutinaId}`, rutinadata, { headers: headers }).pipe(take(1)); 
  };

  // Metodo que me permite borrar la rutina
  deleteRutina(rutinaId: number): Observable<any> {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
  
    // Borra el alumno segun el id especificado
    return this.httpClient.delete(`${this.url}/planificacion/${rutinaId}`, { headers: headers }).pipe(take(1));
  }

    // Agrego esta función para enviar una solicitud POST y crear una nueva rutina
  createRutina(rutinadata: any): Observable<any> {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return this.httpClient.post(`${this.url}/planificaciones`, rutinadata, { headers: headers }).pipe(take(1));
  }  
}
