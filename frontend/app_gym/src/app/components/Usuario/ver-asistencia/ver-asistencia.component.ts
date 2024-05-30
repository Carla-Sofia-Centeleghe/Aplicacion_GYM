import { Component, Input, Output, OnChanges, EventEmitter, SimpleChanges } from "@angular/core";
import { Router } from '@angular/router';
import { BuscarAlumnoService } from 'src/app/services/alumnos/buscar-alumno.service';
import { VerClasesService } from 'src/app/services/clases/ver-clases.service';
import { AbmAlumnosService } from "src/app/services/alumnos/abm-alumnos.service";



@Component({
  selector: 'app-ver-asistencia',
  templateUrl: './ver-asistencia.component.html',
  styleUrls: ['./ver-asistencia.component.css']
})
export class VerAsistenciaComponent implements OnChanges {
  //Este input lo uso como variable para saber si debo refrescar el resultado de busqueda
  @Input() someInput!: string ;
  //Esto lo uso como bandera para hacer saber que se agrego un alumno a una clase, 
  @Output() someOutput = new EventEmitter<boolean>();
  
  //bandera que hace el seguimiento de intervalos entre verdadero o falso de bandera
  toggleState: boolean = false;

  arrayAsistencia: any;
  arrayUsuario:any;
  currentPage: number = 1; // Pagina actual
  totalPages: number  = 0; // Total de paginas
  totalItems: number  = 0; //Total de elementos encontrados
  itemsPerPage: number  = 2; //Numero de items por pagina
  
  
  //Inicio los servicios que voy a usar para traer la informacion del backend
  constructor(private router: Router,
    private buscaralumnoservice : BuscarAlumnoService ,
    private abmalumnoservice: AbmAlumnosService,
    private asistencia: VerClasesService ) { }

    ngOnInit() {
      // Traigo los alumnos resultantes de la barra de busqueda
      this.searchquery()
      this.toggleState = !this.toggleState;
    }
    

    ngOnChanges(changes: SimpleChanges): void {
      //Si la variable de busqueda tuvo cambios, se refrescara con nuevos resultados
      console.log(this.someInput);
      //Cuando rebusco algo por defecto me llevara a la primeram pagina siempre
      this.buscaralumnoservice.retrieve_requested_page(1,4)
      this.searchquery()

    }

    searchquery(){
      // Traigo los alumnos resultantes de la barra de busqueda
      this.buscaralumnoservice.getUsers().subscribe((data:any) =>{
        console.log('JSON data', data);
        this.arrayUsuario = data.alumnos
        this.currentPage = data.page
        this.totalPages = data.pages
        this.itemsPerPage = data.total
        console.log('JSON data', data.total);
      })      
    }

    //Hago una lista para las paginas, exceptuando la pagina actual
    getPageNumbers(): number[] {
      return new Array(this.totalPages).fill(0).map((_, index) => index + 1);
    }

    changepage(pagenumber:number):void {
      this.currentPage= pagenumber
      this.buscaralumnoservice.retrieve_requested_page(pagenumber,this.itemsPerPage)
      this.searchquery()
    }

    navigateToFirstPage():void {
      this.currentPage= 1
      this.buscaralumnoservice.retrieve_requested_page(1,this.itemsPerPage)
      this.searchquery()
    }

    seleccionarclase(clase_id:any): void {
      this.asistencia.retrieve_clase_id(clase_id); //guardo el id de la clase para posteriormente saber que traer
      console.log(clase_id)
      this.router.navigate(['/clases-todas'] ); 
    
    }
    
    editarIdClase(userId: number): void {
      console.log(userId);
      this.asistencia.editUserIdClase(userId).subscribe({
        next: () => {
          console.log(userId);
          this.router.navigateByUrl('/clases-asistencia-admi');
          // Cuando se agrega un alumno, cambia el estado de la bandera
          this.someOutput.emit(this.toggleState);
          this.toggleState = !this.toggleState;
        },
        error: (error) => {
          alert('No se pudo editar el id_clase del alumno');
        },
        complete: () => {
          console.log('Operación de edición completa');
        }
      });
    }
    
}