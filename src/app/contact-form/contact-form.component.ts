import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  contactForm!: FormGroup;
  countries = ['Colombia', 'Argentina', 'México'];
  departments = ['Cundinamarca', 'Antioquia', 'Valle del Cauca']; // Solo para Colombia
  isMinor = false;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      sexo: ['', Validators.required],
      birthdate: ['', [Validators.required, this.validateAge]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      pais: ['', Validators.required],
      departamento: [''],
      ciudad: [''],
      comentarios: ['']
    });

    // Detectar cambio en país
    this.contactForm.get('pais')?.valueChanges.subscribe(value => {
      if (value === 'Colombia') {
        this.contactForm.get('departamento')?.setValidators([Validators.required]);
      } else {
        this.contactForm.get('departamento')?.clearValidators();
      }
      this.contactForm.get('departamento')?.updateValueAndValidity();
    });
  }

  // Valida si el usuario tiene 18 años o más
  validateAge(control: AbstractControl) {
    const birthdate = new Date(control.value);
    const age = new Date().getFullYear() - birthdate.getFullYear();
    return age >= 18 ? null : { minor: true };
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }

    const formValues = this.contactForm.value;
    alert('Formulario enviado correctamente');
    // Aquí puedes agregar el código para enviar los datos a la tabla
    this.router.navigate(['/data-table']); 
  }
}
