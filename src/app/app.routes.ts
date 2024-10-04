import { Routes } from '@angular/router';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { DataTableComponent } from './data-table/data-table.component';

export const routes: Routes = [
  { path: '', redirectTo: 'contact-form', pathMatch: 'full' }, // Redirige a contact-form por defecto
  { path: 'contact-form', component: ContactFormComponent },
  { path: 'data-table', component: DataTableComponent },
  { path: '**', redirectTo: 'contact-form' } // Redirige a contact-form si la ruta no coincide
];

