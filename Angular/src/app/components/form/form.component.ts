import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/clients/client.service';
import { Client } from '../clients/client';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import swal from 'sweetalert2';
import { Region } from '../clients/region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public client: Client = new Client();
  public title: string = 'Create Client';
  regions: Region[];
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
        );
      }
    });
    this.clientService.getRegions().subscribe(regions => this.regions = regions);
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

  compareRegion(o1: Region, o2: Region): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

}
