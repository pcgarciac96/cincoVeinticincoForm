import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  this.http.get<any[]>('https://cincoeventicinco.com/users.json', { withCredentials: true }).subscribe(
    data => {
      this.users = data;
    },
    error => {
      console.error('Error:', error);
    }
  );
}

}
