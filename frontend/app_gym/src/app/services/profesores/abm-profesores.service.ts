import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, take } from 'rxjs';

// Decorador Injectable para poder inyectar el servicio en otros componentes
@Injectable({
  providedIn: 'root'
})
export class AbmProfesoresService {
  url='/api';
  teacher_id=''

  constructor(
    private httpClient: HttpClient
  ) { }
  // Metodo que te guarda el valor que seleccionaste y asi saber que buscar
  retrieve_profesor_id(search: string){
    console.log('Response from service:', search);
    this.teacher_id= search;
  }

  // Metodo que me permite asignar el string del valor a buscar en el backend
  getmaxid(){
    let auth_token = localStorage.getItem('token')
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    // Busco el maximo id de usuario que exista
    return this.httpClient.get(this.url + '/usuarios?get_max_id=0', {headers: headers});

  }
  // Metodo que me conecta el backend para traer el listado de profesores GET 
  getUsers() {
    let auth_token = localStorage.getItem('token')
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    
    // Envio la query a buscar por nombre o apellido del profesor
    return this.httpClient.get(this.url + '/profesores?user_abm='+this.teacher_id, {headers: headers});

  };

  // Datos globales, clase Padre
  // Metodo que me permite usar el recurso PUT para editar el Usuario segun los valores del formulario
  editUser(userId: number, dataUser: any): Observable<any> {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    // Edita el usuario segun el id especificado y lo guarda en la base de datos
    return this.httpClient.put(`${this.url}/usuario/${userId}`, dataUser, { headers: headers }).pipe(take(1));
  }

  // Datos puntuales, clase Hijo
  // Edita los datos especificos del profesor
  editTeacher(userId: number, dataUser: any): Observable<any> {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    // Edita el profesor segun el id especificado y lo guarda en la base de datos
    return this.httpClient.put(`${this.url}/usuarioprofesor/${userId}`, dataUser, { headers: headers }).pipe(take(1));
  }

  //Metodo que me permite borrar datos especificos de profesor DELETE
  deleteTeacher(userId: number): Observable<any> {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
  
    // Borra el proferor segun el id especificado y guarda los cambios en la base de datos
    return this.httpClient.delete(`${this.url}/usuarioprofesor/${userId}`, { headers: headers }).pipe(take(1));
  }


  


  createUser(dataLogin:any): Observable<any>{

    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    //Da de alta un profesor
    return this.httpClient.post(this.url + '/usuarios',dataLogin, { headers: headers }).pipe(take(1));
  }

  createTeacher(dataTeacher: any): Observable<any> {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    // Da de alta los datos especificos para profesores
    return this.httpClient.post(`${this.url}/profesores`, dataTeacher, { headers: headers }).pipe(take(1));
  }  


    
  

}
