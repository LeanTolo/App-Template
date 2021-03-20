import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogTitleComponent } from '../dialogs/dialog-title/dialog-title.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title:string = 'App Angular Title'

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(){
    let dialogRef = this.dialog.open(DialogTitleComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    });
  }

}
