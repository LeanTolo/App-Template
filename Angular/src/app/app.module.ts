import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DirectiveComponent } from './components/directive/directive.component';
import { ClientsComponent } from './components/clients/clients.component';
import { FormComponent } from './components/form/form.component';
import { DialogTitleComponent } from './components/dialogs/dialog-title/dialog-title.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { DetailComponent } from './components/clients/detail/detail.component';

import { ClientService } from './services/clients/client.service';

import localeEN from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';

registerLocaleData(localeEN, 'en');

const routes: Routes = [
  {path: '', redirectTo: '/clients', pathMatch: 'full' },
  {path: 'directive', component: DirectiveComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'clients/page/:page', component: ClientsComponent},
  {path: 'clients/form', component: FormComponent},
  {path: 'clients/form/:id', component: FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectiveComponent,
    ClientsComponent,
    FormComponent,
    DialogTitleComponent,
    PaginatorComponent,
    DetailComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatDialogModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [ClientService,
    { provide: LOCALE_ID, useValue: 'en' },
    MatDatepickerModule,
    MatNativeDateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
