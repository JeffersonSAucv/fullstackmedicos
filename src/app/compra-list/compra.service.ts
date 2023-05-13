import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from "rxjs";
import {catchError,tap} from 'rxjs/operators';
import { Compra } from '../models/compra';
import { TransaccionCompra } from '../models/transaccionCompra';
import { Respuesta } from '../models/respuesta';
import { EditCompraListaDetalle } from '../models/editCompraListaDetalle';
const headerCommon={headers:new HttpHeaders( { 'Content-Type': 'application/json',
'Authorization':'Bearer '+sessionStorage.getItem('token')
})}
@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http:HttpClient) { }
   private readonly API_URL=environment.apiUrl;
   ListCompras( numeroDocumento:string, razonSocial:string):Observable<Compra[]>
  {
    const httpOptions = {
      headers: { 'Content-Type': 'application/json',
'Authorization':'Bearer '+sessionStorage.getItem('token')
},
      params: {numeroDocumento: numeroDocumento,
        razonSocial: razonSocial,
        }
  };
    return this.http.get<Compra[]>(this.API_URL+"/api/compra/List",httpOptions).pipe(tap((data)=>{
      console.log(data);
    }),catchError(err=>{throw console.log(err)}));
   }
   SaveCompras(transaccionCompra:TransaccionCompra):Observable<Respuesta>{
   
    return this.http.post<Respuesta>(this.API_URL+"/Api/Compra/Save",transaccionCompra,headerCommon).pipe(tap((data)=>{
       console.log(data);
    }),catchError(err=>{throw console.log(err) }));
   }
   getCompraPorId(id:number):Observable<EditCompraListaDetalle[]>{
     return this.http.get<EditCompraListaDetalle[]>(this.API_URL+"/Api/Compra/Detail/"+id,headerCommon).pipe(tap((data)=>{
        console.log(data);
     }),catchError(err=>{throw console.log(err)}))
   }
}
