import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { Constants } from '../utils/constants';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router, private loginService: LoginService) {}

  public email: string = 'hi@mail.com';
  public clave: string = '1234';
  public mensaje: string = '';
  public isError = false;
  hide = true;

  setError(message: string) {
    this.isError = true;
    this.mensaje = message;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  logIn() {
    if (this.email && this.clave) {
      let usu = new Usuario(this.email, this.clave, '');
      this.loginService.ValidarUsuario(usu).subscribe({
        next: (usuario: Usuario) => {
          sessionStorage.removeItem('token');
          sessionStorage.setItem('token', usuario.token);
          this.router.navigate(['mfacade/facade/minicio/inicio']);
          this.isError = false;
        },
        error: (error) => {
          this.setError(Constants.MENSAJE_ERROR.LOGIN.DATOS_ERRONEOS)
        },
      });
    } else {
      this.setError(Constants.MENSAJE_ERROR.LOGIN.CREDENCIALES)
    }
  }
}
