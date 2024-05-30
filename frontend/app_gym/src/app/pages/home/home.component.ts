import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

 // Me re direcciona a home Component
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  
  get isToken(){
    return localStorage.getItem('token');
  }
}




