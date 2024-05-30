import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, take } from 'rxjs';

// Decorador Injectable para poder inyectar el servicio en otros componentes
@Injectable({
  providedIn: 'root'
})
export class AbmAlumnosService {
  url='/api';
  student_id=''
  user_id=0

      constructor(
        private httpClient: HttpClient
      ) { }

      // Metodo que me permite asignar el string del valor a buscar en el backend
      retrieve_alumno_id(search: string){
        console.log('Response from service:', search);
        this.student_id= search;
      }
      // Metodo que te traer el id del usuario maximo
      getmaxid(){
        let auth_token = localStorage.getItem('token')
        
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        })
        //Busco el maximo id de usuario que exista
        return this.httpClient.get(this.url + '/usuarios?get_max_id=0', {headers: headers});
  
      }
      // Metodo que me conecta el backend para traer el listado de alumnos GET
      getUsers() {
        let auth_token = localStorage.getItem('token')
  
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        })
        
        // Envio la query a buscar por nombre o apellido del alumno
        return this.httpClient.get(this.url + '/usuariosalumnos?user_abm='+this.student_id, {headers: headers});
  
      };

      // Datos globales, clase Padre
      // Metodo que me permite usar el recurso PUT para editar el Usuario segun los valores del formulario
      editUser(userId: number, dataUser: any): Observable<any> {
        let auth_token = localStorage.getItem('token');
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        });
        // Edita el Usuario segun el id especificado
        return this.httpClient.put(`${this.url}/usuario/${userId}`, dataUser, { headers: headers }).pipe(take(1));
      }
      // Datos
      // Metodo que me permite usar el recurso PUT para editar el alumno segun los valores del formulario
      editStudent(userId: number, dataUser: any): Observable<any> {
        let auth_token = localStorage.getItem('token');
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        });
        //Edita el alumno segun el id especificado
        return this.httpClient.put(`${this.url}/usuarioalumno/${userId}`, dataUser, { headers: headers }).pipe(take(1));
      }      

      
      // Metodo que me permite borrar el Usuario DELETE
      deleteUser(userId: number): Observable<any> {
        let auth_token = localStorage.getItem('token');
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        });
      
        // Borra el usuario segun el id especificado
        return this.httpClient.delete(`${this.url}/usuario/${userId}`, { headers: headers }).pipe(take(1));
      }

      // Metodo que me permite crear un usuario POST
      createUser(dataLogin:any): Observable<any>{

        let auth_token = localStorage.getItem('token');
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        });
        // Da de alta un alumno
        return this.httpClient.post(this.url + '/usuarios',dataLogin, { headers: headers }).pipe(take(1));
      }
      // Metodo que me permite crear un alumno POST
      createStudent(dataLogin:any): Observable<any>{

        let auth_token = localStorage.getItem('token');
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`

        });
        // Da de alta con los datos propios del alumno
        return this.httpClient.post(this.url + '/usuariosalumnos',dataLogin, { headers: headers }).pipe(take(1));

      }
}
