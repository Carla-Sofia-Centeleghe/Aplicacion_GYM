import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VerClasesService } from 'src/app/services/clases/ver-clases.service';


@Component({
  selector: 'app-clases-todas',
  templateUrl: './clases-todas.component.html',
  styleUrls: ['./clases-todas.component.css']
})
export class ClasesTodasComponent {

  arrayClases:any;
  constructor(private router: Router,
    private verclase: VerClasesService ) { }


    ngOnInit(){
      this.verclase.getallClases().subscribe((data:any)=>{
        console.log('JSON data', data.clases);
        this.arrayClases = data.clases
      
      })
    }

    seleccionarclase(claseid:any): void {
      this.verclase.retrieve_clase_id(claseid); //guardo el id del alumno para posteriormente saber a que alumno debo traer en las querys
      console.log(claseid)
      this.router.navigate(['/clases-asistencia-admi'] );  //  te lleva a visualizar
    
    }
}
