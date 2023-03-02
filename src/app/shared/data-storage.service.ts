import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take, tap } from 'rxjs';
import { Todo } from '../todos/todo.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient) {}

  storeTodos(todos: Todo[]) {
    this.http
      .put(
        'https://angular-todo-list-b4598-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
        todos
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchTodos() {
    return this.http
      .get<Todo[]>(
        'https://angular-todo-list-b4598-default-rtdb.europe-west1.firebasedatabase.app/todos.json'
      )
      .pipe(
        map((todos: Todo[]) => {
          if (todos) {
            return todos;
          } else {
            return [];
          }
        }),
        tap((todos: Todo[]) => {
          if (todos) {
            console.log(todos);
          } else {
            console.log('Todos is empty!');
          }
        })
      );
  }
}
