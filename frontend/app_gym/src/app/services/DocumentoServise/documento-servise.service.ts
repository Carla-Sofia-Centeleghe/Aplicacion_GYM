import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, take} from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


// Servicio que se encarga de verificar si un documento existe

// Decorador Injectable para poder inyectar el servicio en otros componentes
@Injectable({
   providedIn: 'root'
 }) 
 
export class DocumentoServise {
   url='/api';
   user_id=''
  
   constructor(
      private httpClient: HttpClient
    ) { }

   // Metodo para chequear si el DNI existe
   checkDNI(user_id:string){
      let auth_token = localStorage.getItem('token')
      
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })
      // Traer el DNI del usiario
      return this.httpClient.get(this.url + '/usuarios?GetDNI='+ user_id, {headers: headers});

   }
   // Metodo para chequear si el EMAIL existe
   checkEMAIL(user_id:string){
      let auth_token = localStorage.getItem('token')
      
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })
      // Traer el mail del usiario
      return this.httpClient.get(this.url + '/usuarios?GetEmail='+ user_id, {headers: headers});

   }
}
