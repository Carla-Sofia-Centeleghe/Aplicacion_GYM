import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, take } from 'rxjs';

// Decorador Injectable para poder inyectar el servicio en otros componentes
@Injectable({
  providedIn: 'root'
})
export class VerClasesService {
  url='/api';
  clase_id="";
  class_flag=false;

  constructor(
    private httpClient: HttpClient
  ) {}

  retrieve_class_flag(){
    
  }
  // Metodo que me permite asignar el string del valor a buscar en el backend
  retrieve_clase_id(search: string){
    console.log('Response from service:', search);
    this.clase_id= search;
  }
  
  // Metodo que me conecta el backend para traer el listado de clases GET
  getallClases() {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.get(this.url + '/clases', {headers: headers});

  };
  
  // Metodo que me conecta el backend para traer el listado asistencia de la clase GET
  getAsistencia(): Observable<any> {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.get(this.url + '/clases?view_student_classes='+this.clase_id, {headers: headers});

  };

  // Metodo que me permite usar el recurso PUT para editar el alumno y asisgnarle una clase
  editUserIdClase(userId: number): Observable<any> {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
  
    const data = { id_Clase:  this.clase_id }; // Cambia según la estructura de tu modelo
    console.log('DataClase:', data);

    // Edita el id_clase del alumno según el id especificado
    return this.httpClient.put(`${this.url}/usuarialumno/${userId}`, data, { headers: headers }).pipe(take(1));
  } 

  // Metodo que me permite usar el recurso DELETE para borrar el id de la clase de un alumno, esto como que elimina al alumno de la clase
  borrarIdClase(userId: number): Observable<any> {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    
    const data = { id_Clase: null }; // Establece id_Clase como null
    return this.httpClient.put(`${this.url}/usuarialumno/${userId}`, data, { headers: headers }).pipe(take(1));
}

}
      
