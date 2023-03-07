import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from '../todos/todo.model';
import { TodosService } from '../todos/todos.service';

@Component({
  selector: 'app-filter-todo',
  templateUrl: './filter-todo.component.html',
  styleUrls: ['./filter-todo.component.scss'],
})
export class FilterTodoComponent implements OnInit, OnDestroy {
  todosSub: Subscription = Subscription.EMPTY;
  dbTodosSub: Subscription = Subscription.EMPTY;
  todos: Todo[] = [];
  doneTodos: Todo[] = [];
  status: string = 'All';

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.todosSub = this.todosService.dbTodosChanged.subscribe((todos) => {
      this.todos = todos;
    });
    this.dbTodosSub = this.todosService.todosChanged.subscribe((dbTodos) => {
      this.doneTodos = dbTodos.filter((todo) => todo.done);
    });
  }

  onClearCompleted() {
    this.todosService.clearCompletedTodos();
  }

  onSetAll() {
    this.todosService.setAllTodos();
    this.status = 'All';
  }

  onSetActive() {
    this.todosService.setActiveTodos();
    this.status = 'Active';
  }

  onSetCompleted() {
    this.todosService.setCompletedTodos();
    this.status = 'Completed';
  }

  ngOnDestroy(): void {
    this.todosSub.unsubscribe();
    this.dbTodosSub.unsubscribe();
  }
}
