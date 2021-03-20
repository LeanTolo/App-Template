import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from '../../services/clients/client.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  paginator: any;

  constructor(public clientService: ClientService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.clientService.getClients(page)
        .pipe(
          tap(response => {
            console.log('ClientsComponent: tap 3');
            (response.content as Client[]).forEach(client => console.log(client.name));
          })
        ).subscribe(response => {
          this.clients = response.content as Client[];
          this.paginator = response;
        });
    });
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
