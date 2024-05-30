import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, take } from 'rxjs';

// Decorador Injectable para poder inyectar el servicio en otros componentes
@Injectable({
  providedIn: 'root'
})
export class AbmAdminService {
  url='/api';

  constructor(
    private httpClient: HttpClient
  ) { }
  // Metodo que me conecta el backend para traer el listado de usuarios GET por id
  getUser(userId: string) {
    let auth_token = localStorage.getItem('token')

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    
    // Envio la query a buscar por nombre o apellido del alumno
    return this.httpClient.get(this.url + '/usuario/'+userId, {headers: headers});

  };
  // Metodo que me permite usar el recurso PUT para editar el Usuario segun los valores del formulario
  editUser(userId: number, dataUser: any): Observable<any> {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    // Edita el usuario segun el id especificado
    return this.httpClient.put(`${this.url}/usuario/${userId}`, dataUser, { headers: headers }).pipe(take(1));
  }    
}
