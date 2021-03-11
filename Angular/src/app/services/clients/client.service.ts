import { Injectable } from '@angular/core';
import { Client } from  '../../components/clients/client';
import { CLIENTS } from '../../components/clients/clients.json';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  private urlEndPoint: string = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) { }

  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'})


//lo hacemos de tipo stream para que spring no frene el motor de angular y sea reactivo
//hacemos un objeto observable y observamos cambios en el sujeto, notificandole a los observadores los cambios
//entonces sin necesidad de refrescar todo, se actualizan los datos de manera responsive
  getClients(): Observable<Client[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => response as Client[] )
    );
  }

  create(client: Client) : Observable<Client> {
    return this.http.post<Client>(this.urlEndPoint, client, {headers: this.httpHeaders})
  }

  getClient(id): Observable<Client>{
    return this.http.get<Client>(`${this.urlEndPoint}/${id}`)
  }

  update(client: Client): Observable<Client>{
    return this.http.put<Client>(`${this.urlEndPoint}/${client.id}`, client, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Client>{
    return this.http.delete<Client>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
  }

}
