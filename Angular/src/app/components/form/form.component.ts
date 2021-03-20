import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/clients/client.service';
import { Client } from '../clients/client';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public client: Client = new Client();
  public title: string = 'Create Client';

  errors: string[];

  constructor(private clientService: ClientService,
  private router: Router,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadClient()
  }

  loadClient(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = +params['id']
      if(id){
        this.clientService.getClient(id).subscribe(
          (client) => this.client = client
        )
      }
    })
  }

  public create(): void{
    this.clientService.create(this.client).subscribe(
      client => {
        this.router.navigate(['/clients']);
        swal.fire('New Client', `${client.name} `, 'success');
      },
      err => {
        this.errors = err.error.validErrors;
        console.error('Backend Code Error: '+ err.status);
        console.error(err.error.validErrors);
      }
    );
  }

  update(): void{
    this.clientService.update(this.client)
    .subscribe(
      json => {
        this.router.navigate(['/clients'])
        swal.fire('Client', `${json.message} ${json.client.name} `, 'success')
      },
      err => {
        this.errors = err.error.errors as string[];
        console.error('Backend Code Error: '+ err.status);
        console.error(err.error.errors);
      }
    )
  }

}
