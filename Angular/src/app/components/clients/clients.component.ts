import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { CLIENTS } from './clients.json';
import { ClientService } from '../../services/clients/client.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];

  constructor(public clientService: ClientService) { }

  ngOnInit(): void {
    //funcion anonima que asigna los valores a clients
    this.clientService.getClients().subscribe(
      (clients) => this.clients = clients
    );
  }

  delete(client: Client): void{

    const swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: `Are You Sure That You Want To Delete ${client.name} ${client.surname}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
    }).then((result) => {
    if (result.isConfirmed) {
      this.clients = this.clients.filter(cli => cli !== client)
      swalWithBootstrapButtons.fire(
        'Deleted!',
        `Client ${client.name} ${client.surname} has been deleted.`,
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        `${client.name} ${client.surname} Is Now Safe :)`,
        'error'
      )
    }
    })
  }

}
