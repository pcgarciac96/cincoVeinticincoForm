import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<any[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor() {}

  // Agregar usuarios obtenidos del endpoint sin sobrescribir los existentes
  setUsers(fetchedUsers: any[]) {
    const currentUsers = this.usersSubject.value;
    this.usersSubject.next([...currentUsers, ...fetchedUsers]); // Se agregan los usuarios nuevos
  }

  addUser(newUser: any) {
    const currentUsers = this.usersSubject.value;
    this.usersSubject.next([...currentUsers, newUser]); // Agregar nuevo usuario
  }

  getUsers() {
    return this.usersSubject.value;
  }
}
