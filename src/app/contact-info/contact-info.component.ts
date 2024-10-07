import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css'],
  imports: [CommonModule]
})
export class ContactInfoComponent implements OnInit {
  address: string = '123 Calle Ficticia, Neiva, Huila';
  email: string = 'ejemplo@correo.com';
  phone: string = '+1234567890';

  constructor() {}

  ngOnInit(): void {}
}
