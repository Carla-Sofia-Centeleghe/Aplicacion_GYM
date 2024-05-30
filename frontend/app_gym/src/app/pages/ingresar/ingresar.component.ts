import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css']
})
export class IngresarComponent {
  loginForm!: FormGroup;

  constructor (
    private authservices: AuthService,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      mail:  ['', Validators.required],    
      password: ['', Validators.required]
    })
  }

  login(dataLogin:any = {}) {
    // DataLogin = { mail: "f@mail.com", password:"123"}, ejemplo de login 
    console.log('Comprobando credenciales');
    this.authservices.login(dataLogin).subscribe ({
      next: (rta:any) => {
        // Alert('Login exitoso');
        console.log ('Respuesta login:',rta.access_token);
        console.log ('Respuesta login:', this.jwtHelper.decodeToken(rta.access_token));
        localStorage.setItem('token',rta.access_token);
        this.router.navigateByUrl('home')
      },
      // Si hay un error en el login, se ejecuta el siguiente codigo
      error:(error) => {
        alert('Credenciales invalidas');
        localStorage.removeItem('token');
      },complete: () => {
        console.log ('Finalizo');

      }
    })
  }
  // Funcion para enviar el formulario y verificar si es valido
  submit() {
    if(this.loginForm.valid) {
      console.log('Form login: ',this.loginForm.value);
      this.login(this.loginForm.value)
    } else {
      alert('Formulario invalido');
    }
  }

}

