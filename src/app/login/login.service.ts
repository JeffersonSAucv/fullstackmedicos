import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Usuario } from '../core/models/usuario';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  private readonly API_URL = environment.apiUrl;
  public ValidarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http
      .post<Usuario>(
        this.API_URL + '/Api/Users/ValidateUser',
        usuario,
        httpOptions
      )
      .pipe(
        tap((data) => {
          console.log(data);
        }),
        catchError((err) => {
          throw console.log('Error del servidor detalles', err);
        })
      );
  }
}
