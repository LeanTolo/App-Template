import { Injectable } from '@angular/core';
import { Client } from  '../../components/clients/client';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';

import { Router } from '@angular/router';
import { Region } from 'src/app/components/clients/region';

@Injectable()
export class ClientService {

  private urlEndPoint: string = 'http://localhost:8080/api/clients';

  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getRegions(): Observable<Region[]>{
    return this.http.get<Region[]>(this.urlEndPoint + '/regions');
  }

//lo hacemos de tipo stream para que spring no frene el motor de angular y sea reactivo
//hacemos un objeto observable y observamos cambios en el sujeto, notificandole a los observadores los cambios
//entonces sin necesidad de refrescar todo, se actualizan los datos de manera responsive
  getClients(page: number): Observable<any>{

    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
          tap((response: any) => {
            console.log('ClientService: tap 1');
            (response.content as Client[]).forEach(client => console.log(client.name));
          }),
          map((response: any) => {
            (response.content as Client[]).map(client => {
              client.name = client.name.toUpperCase();
              //let datePipe = new DatePipe('es');
              //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
              //cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'es');
              return client;
            });
            return response;
          }),
          tap(response => {
            console.log('ClienteService: tap 2');
            (response.content as Client[]).forEach(client => console.log(client.name));
          })
        );
  }

  create(client: Client) : Observable<Client> {
    return this.http.post<any>(this.urlEndPoint, client, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.client as Client),
      catchError(e =>{

        if (e.status == 400){
            return throwError(e);
        }

        console.error(e.error.message);
        console.error(e.error.errors);
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

        if (e.status == 400){
            return throwError(e);
        }

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

  uploadPhoto(file: File, id): Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);
    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });
    return this.http.request(req);
  }

}
