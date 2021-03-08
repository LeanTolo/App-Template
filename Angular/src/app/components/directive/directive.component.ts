import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.css']
})
export class DirectiveComponent implements OnInit {

  listProgramm: string[] = ['TypeScript','JavaScript','Java SE','C#','PHP'];

  habilitar: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  setHabilitar(): void {
    this.habilitar = (this.habilitar==true)? false: true;
  }

}
