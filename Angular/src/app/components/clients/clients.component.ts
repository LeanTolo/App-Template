import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { CLIENTS } from './clients.json';
import { ClientService } from '../../services/clients/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    //funcion anonima que asigna los valores a clients
    this.clientService.getClients().subscribe(
      (clients) => this.clients = clients
    );
  }

}
