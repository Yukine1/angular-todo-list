import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodosService implements OnDestroy {
  todosChanged = new Subject<Todo[]>();
  todosSub: Subscription;
  todos: Todo[] = [];

  constructor(private dataStorageService: DataStorageService) {
    this.todosSub = Subscription.EMPTY;
  }

  setTodos() {
    return this.dataStorageService.fetchTodos().subscribe((todos) => {
      this.todos = todos;
      this.todosChanged.next(this.todos);
    });
  }

  getTodos() {
    return this.todos;
  }

  getTodo(id: number) {
    return this.todos[id];
  }

  addTodo(todoText: string | undefined | null) {
    this.todos.push({
      id: Date.now(),
      text: todoText,
      done: false,
      description: '',
    });
    this.todosChanged.next(this.todos);
    this.dataStorageService.storeTodos(this.todos);
  }

  updateTodo(index: number, newText: string) {
    this.todos[index].text = newText;
    this.todosChanged.next(this.todos);
    this.dataStorageService.storeTodos(this.todos);
  }

  toggleTodo(id: number | undefined) {
    this.todos.filter((todo) => {
      if (todo.id === id) {
        todo.done = !todo.done;
        // this.updateTodo(todo.id, todo);
        this.dataStorageService.storeTodos(this.todos);
      }
    });
    this.todosChanged.next(this.todos);
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.todosChanged.next(this.todos);
    this.dataStorageService.storeTodos(this.todos);
  }

  ngOnDestroy(): void {
    this.todosSub.unsubscribe();
  }
}
