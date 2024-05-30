import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent {

  constructor(private router: Router) {}

  redirectToabmalumno() {
    const buttonId = 1; // Id para buscar alumnos
    this.router.navigate(['/usuario-abm'] , { queryParams: { id: buttonId } });
  }


  
}
