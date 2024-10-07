import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  contactForm!: FormGroup;
  countries = ['Colombia', 'Argentina', 'México'];
  departments = ['Cundinamarca', 'Antioquia', 'Valle del Cauca'];
  isEditing: boolean = false;
  userToEdit: any;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      sex: ['', Validators.required],
      date_birthday: ['', [Validators.required, this.validateAge]],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      country: ['', Validators.required],
      department: [''],
      city: ['', Validators.required],
      apartment: [''],
      comment: ['', Validators.required]
    });

    this.userService.editUser$.subscribe(user => {
      if (user) {
        this.isEditing = true;
        this.contactForm.patchValue(user);
      } else {
        this.isEditing = false;
        this.contactForm.reset();
      }
    });

    this.contactForm.get('country')?.valueChanges.subscribe(value => {
      if (value === 'Colombia') {
        this.contactForm.get('department')?.setValidators([Validators.required]);
      } else {
        this.contactForm.get('department')?.clearValidators();
      }
      this.contactForm.get('department')?.updateValueAndValidity();
    });
  }

  validateAge(control: AbstractControl) {
    const date_birthday = new Date(control.value);
    const age = new Date().getFullYear() - date_birthday.getFullYear();
    return age >= 18 ? null : { minor: true };
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }
  
    const user:User = this.contactForm.value;
  
    if (this.isEditing) {
      const index = this.userService.getUsers().findIndex(u => u.email === user.email);
      if (index !== -1) {
        this.userService.updateUser(index, user);
        alert('Usuario editado correctamente');
      }
    } else {
      this.userService.addUser(user);
      alert('Usuario agregado correctamente');
    }
  
    this.router.navigate(['/data-table']);
  }
  
}
