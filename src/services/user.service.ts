import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<any[]>([]);
  users$ = this.usersSubject.asObservable();

  private editUserSubject = new BehaviorSubject<any | null>(null);
  editUser$ = this.editUserSubject.asObservable();

  constructor() {}

  setUsers(fetchedUsers: any[]) {
    const currentUsers = this.usersSubject.value;
  
    const newUsers = fetchedUsers.filter(fetchedUser => 
      !currentUsers.some(currentUser => currentUser.id === fetchedUser.id) // Asumiendo que cada usuario tiene un ID único
    );
  
    this.usersSubject.next([...currentUsers, ...newUsers]);
  }

  addUser(newUser: any) {
    const currentUsers = this.usersSubject.value;
    this.usersSubject.next([...currentUsers, newUser]);
  }

  getUsers() {
    return this.usersSubject.value;
  }

  updateUser(index: number, updatedUser: any) {
    const currentUsers = this.usersSubject.getValue();
    currentUsers[index] = updatedUser;
    this.usersSubject.next(currentUsers);
  }

  setEditUser(user: any) {
    this.editUserSubject.next(user);
  }

  clearEditUser() {
    this.editUserSubject.next(null);
  }
}
