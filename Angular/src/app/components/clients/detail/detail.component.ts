import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../client';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ClientService } from 'src/app/services/clients/client.service';
import { ModalService } from 'src/app/services/clients/modal.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() client:Client;

  title: string = "Client Detail";
  private selectedPhoto: File;
  progress: number = 0;

  constructor(private clientService: ClientService,
    public modalService: ModalService) { }

  ngOnInit() { }

  selectPhoto(event) {
    this.selectedPhoto = event.target.files[0];
    this.progress = 0;
    console.log(this.selectedPhoto);
    if (this.selectedPhoto.type.indexOf('image') < 0) {
      swal.fire('Error Choosing Image: ', 'File Must Be An Image', 'error');
      this.selectedPhoto = null;
    }
  }

  uploadPhoto() {

    if (!this.selectedPhoto) {
      swal.fire('Error Upload: ', 'Must Choose a Photo', 'error');
    } else {
      this.clientService.uploadPhoto(this.selectedPhoto, this.client.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.client = response.client as Client;
            this.modalService.uploadNotify.emit(this.client);
            swal.fire('Photo Uploaded Successfully!', response.mensaje, 'success');
          }
        });
    }
  }

  closeModal(){
    this.modalService.closeModal();
    this.selectPhoto = null;
    this.progress = 0;
  }

}
