import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Router } from '@angular/router';
import { BuscarProfesorService } from 'src/app/services/profesores/buscar-profesor.service';
import { AbmProfesoresService } from "src/app/services/profesores/abm-profesores.service";



@Component({
  selector: 'app-ver-profesores',
  templateUrl: './ver-profesores.component.html',
  styleUrls: ['./ver-profesores.component.css']
})
export class VerProfesoresComponent implements OnChanges  {
  @Input() someInput!: string ;

  arrayUsuario:any;
  currentPage: number = 1; // Pagina actual
  totalPages: number  = 0; // Total de paginas
  totalItems: number  = 0; //Total de elementos encontrados
  itemsPerPage: number  = 2; //Numero de items por pagina
  
  constructor(private router: Router,

  //lupita de buscqueda
  private buscarprofesorservice : BuscarProfesorService,
  private abmprofesorservice : AbmProfesoresService  ) { }
  
  ngOnInit() {
    this.buscarprofesorservice.getUsers().subscribe((data:any) =>{
      console.log('JSON data', data);
      this.arrayUsuario = data.profesores
    })
  }

  handleButtonClick(profesorid:any): void {

    this.abmprofesorservice.retrieve_profesor_id(profesorid); //guardo el id del alumno para posteriormente saber a que alumno debo traer en las querys
    console.log(profesorid)
    const buttonId = 2; // Id para buscar alumnos
    this.router.navigate(['/usuario-abm'] , { queryParams: { id: buttonId } });  //  te lleva a visualizar el abm de profesores
  
  }



  confirmDelete(): void {
    
    const confirmed = window.confirm('Estas seguro de que deseas borrar este usuario');
    if (confirmed) {

      console.log('Item deleted.'); // Boton de confirmacion para borrar item
      this.router.navigate(['/home']);
    } else {

    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Si la variable de busqueda tuvo cambios, se refrescara con nuevos resultados
    console.log(this.someInput);
    this.buscarprofesorservice.getUsers().subscribe((data:any) =>{
      console.log('JSON data', data);
      this.arrayUsuario = data.profesores
    })
  }

  searchquery(){
    // Traigo los alumnos resultantes de la barra de busqueda
    this.buscarprofesorservice.getUsers().subscribe((data:any) =>{
      console.log('JSON data', data);
      this.arrayUsuario = data.alumnos
      this.currentPage = data.page
      this.totalPages = data.pages
      this.itemsPerPage = data.total
      console.log('JSON data', data.total);
    })      
  }
  
  navigateToFirstPage():void {
    this.currentPage= 1
    this.buscarprofesorservice.retrieve_requested_page(1,this.itemsPerPage)
    this.searchquery()
  }

  changepage(pagenumber:number):void {
    this.currentPage= pagenumber
    this.buscarprofesorservice.retrieve_requested_page(pagenumber,this.itemsPerPage)
    this.searchquery()
  }

  

  }