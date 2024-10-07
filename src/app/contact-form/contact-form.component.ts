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
      sex: ['', Validators.required],
      date_birthday	: ['', [Validators.required, this.validateAge]],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      addres: ['', Validators.required],
      country: ['', Validators.required],
      department: [''],
      city: [''],
      comment: ['']
    });

    // Detectar cambio en país
    this.contactForm.get('country')?.valueChanges.subscribe(value => {
      if (value === 'Colombia') {
        this.contactForm.get('department')?.setValidators([Validators.required]);
      } else {
        this.contactForm.get('department')?.clearValidators();
      }
      this.contactForm.get('department')?.updateValueAndValidity();
    });
  }

  // Valida si el usuario tiene 18 años o más
  validateAge(control: AbstractControl) {
    const date_birthday	= new Date(control.value);
    const age = new Date().getFullYear() - date_birthday.getFullYear();
    return age >= 18 ? null : { minor: true };
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }
    alert('Formulario enviado correctamente');

    this.router.navigate(['/data-table']);
  }
}
