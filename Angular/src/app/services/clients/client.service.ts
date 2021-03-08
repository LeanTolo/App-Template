import { Injectable } from '@angular/core';
import { Client } from  '../../components/clients/client';
import { CLIENTS } from '../../components/clients/clients.json';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  private urlEndPoint: string = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) { }


//lo hacemos de tipo stream para que spring no frene el motor de angular y sea reactivo
//hacemos un objeto observable y observamos cambios en el sujeto, notificandole a los observadores los cambios
//entonces sin necesidad de refrescar todo, se actualizan los datos de manera responsive
  getClients(): Observable<Client[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => response as Client[] )
    );
  }

}
