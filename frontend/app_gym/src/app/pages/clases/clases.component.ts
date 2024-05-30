import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Me re direcciona a Clases Component y a su vez a app_ver_clases
@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent {
  clase_id!: string;
  detalles!: string;
  detallesgenerales!: string;
  imagen!: string;


  constructor(
    private route:ActivatedRoute
  ) { }
  // Constructor del componente, que me trae los datos de la clase que se selecciono, en usuario no registrado
  ngOnInit(): void {
    this.clase_id = this.route.snapshot.paramMap.get('id') || '';
    this.detalles= this.route.snapshot.paramMap.get('detalles') || '';
    this.detallesgenerales = this.route.snapshot.paramMap.get('detallesgenerales') || '';  
    this.imagen = this.route.snapshot.paramMap.get('detallesgenerales') || '';  
    
    console.log('this.usuario_id: ',this.clase_id);
    console.log('this.detalles: ',this.detalles);
    console.log('this.detallesgenerales: ',this.detallesgenerales);
    console.log('this.imagen ',this.imagen);

  }

}
