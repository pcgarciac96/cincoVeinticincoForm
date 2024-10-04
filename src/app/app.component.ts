import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactFormComponent } from './contact-form/contact-form.component'; // Importa tu componente de formulario

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContactFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'cincoVeinticincoForm';
}
