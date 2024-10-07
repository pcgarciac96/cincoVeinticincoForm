import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service'; // Importar el servicio

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent {
  users: any[] = [];

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    // Obtener usuarios del endpoint
    this.http.get<any>('https://cincoveinticinco.com/users.json').subscribe({
      next: (data) => {
        const fetchedUsers = data.users || [];
        this.userService.setUsers(fetchedUsers); // Agregar usuarios a la lista existente
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
      complete: () => {
        console.log('Request completed');
      }
    });

    // Suscribirse a cambios en la lista de usuarios
    this.userService.users$.subscribe(users => {
      this.users = users;
    });
  }
}
