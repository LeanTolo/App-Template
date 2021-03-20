import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ClientService } from 'src/app/services/clients/client.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  client: Client;
  title: string = "Client Detail";
  private selectedPhoto: File;
  progress: number = 0;

  constructor(private clientService: ClientService,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
      this.activatedRoute.paramMap.subscribe(params => {
        let id: number = +params.get('id');
        if (id) {
          this.clientService.getClient(id).subscribe(client => {
            this.client = client;
          });
        }
      });
  }

  selectPhoto(event) {
    this.selectedPhoto = event.target.files[0];
    this.progress = 0;
    console.log(this.selectedPhoto);
    if (this.selectedPhoto.type.indexOf('image') < 0) {
      swal.fire('Error seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'error');
      this.selectedPhoto = null;
    }
  }

  uploadPhoto() {

    if (!this.selectedPhoto) {
      swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.clientService.uploadPhoto(this.selectedPhoto, this.client.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.client = response.client as Client;
            swal.fire('La foto se ha subido completamente!', response.mensaje, 'success');
          }
        });
    }
  }

}
