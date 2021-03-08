import { Injectable } from '@angular/core';
import { Client } from  '../../components/clients/client';
import { CLIENTS } from '../../components/clients/clients.json';
import { Observable } from 'rxjs';
import { of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  constructor() { }


//lo hacemos de tipo stream para que spring no frene el motor de angular y sea reactivo
//hacemos un objeto observable y observamos cambios en el sujeto, notificandole a los observadores los cambios
//entonces sin necesidad de refrescar todo, se actualizan los datos de manera responsive
  getClients(): Observable<Client[]>{
    return of(CLIENTS);
  }

}
