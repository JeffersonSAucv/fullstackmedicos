import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { getHeaders } from 'src/app/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class PacientesService {
  constructor(private http: HttpClient) {}
  private readonly API_URL = environment.apiUrl;

  obtenerpacientes(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL + '/api/compra/List', {
      headers: getHeaders(),
    });
  }
}
