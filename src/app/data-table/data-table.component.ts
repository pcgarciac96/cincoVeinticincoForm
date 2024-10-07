import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';
  sortColumn: string = 'name';
  filterTerm: string = '';

  constructor(private http: HttpClient, private userService: UserService,  private router: Router,) {}

  ngOnInit(): void {
    this.userService.editUser$.subscribe(editUser => {
      if (!editUser) {
        this.http.get<any>('https://cincoveinticinco.com/users.json').subscribe({
          next: (data) => {
            const fetchedUsers = (data.users || []).map((user:any) => ({
              id: user.id,
              sex: user.sex === "Hombre" ? "m" : "f",
              date_birthday: user.date_birthday,
              name: user.name,
              last_name: user.last_name,
              email: user.email,
              address: user.addres, 
              country: user.country,
              department: user.Deparment,
              city: user.City,
              comment: user.comment
            }));
            this.userService.setUsers(fetchedUsers); 
          },
          error: (err) => {
            console.error('Error fetching users:', err);
          },
          complete: () => {
            console.log('Request completed');
          }
        });
      }
    });
  
    this.userService.users$.subscribe(users => {
      this.users = users;
      this.filteredUsers = this.users;
    });
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
      user.country.toLowerCase().includes(this.filterTerm.toLowerCase())
    );
  }

  sortUsers(column: keyof User) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortDirection = 'asc';
    }
    this.sortColumn = column;

    this.filteredUsers.sort((a, b) => {
      const valueA = a[column] as string;
      const valueB = b[column] as string;

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  editUser(user: User) {
  this.userService.setEditUser(user);
  
  this.router.navigate(['/contact-form'], { state: { user } });
}
}
