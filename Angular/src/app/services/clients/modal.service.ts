import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: boolean = false;

  private _uploadNotify = new EventEmitter<any>();

  constructor() { }

  get uploadNotify(): EventEmitter<any>{
    return this._uploadNotify;
  }

  openModal(){
    this.modal = true;
  }

  closeModal(){
    this.modal = false;
  }

}
