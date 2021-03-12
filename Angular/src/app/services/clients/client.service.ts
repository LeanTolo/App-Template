import { Injectable } from '@angular/core';
import { Client } from  '../../components/clients/client';
import { CLIENTS } from '../../components/clients/clients.json';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  private urlEndPoint: string = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient, private router: Router) { }

  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'})


//lo hacemos de tipo stream para que spring no frene el motor de angular y sea reactivo
//hacemos un objeto observable y observamos cambios en el sujeto, notificandole a los observadores los cambios
//entonces sin necesidad de refrescar todo, se actualizan los datos de manera responsive
  getClients(): Observable<Client[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => response as Client[] )
    );
  }

  create(client: Client) : Observable<any> {
    return this.http.post<any>(this.urlEndPoint, client, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.message);
        swal.fire(e.error.message,e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getClient(id): Observable<Client>{
    return this.http.get<Client>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e =>{
        this.router.navigate(['/clients']);
        console.error(e.error.message);
        swal.fire('Error On Edit',e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  update(client: Client): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${client.id}`, client, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.message);
        swal.fire(e.error.message,e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Client>{
    return this.http.delete<Client>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.message);
        swal.fire(e.error.message,e.error.error, 'error');
        return throwError(e);
      })
    );
  }

}
