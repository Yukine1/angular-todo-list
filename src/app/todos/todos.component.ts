import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from './todo.model';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  todosSub: Subscription;

  constructor(private todosService: TodosService) {
    this.todosSub = Subscription.EMPTY;
  }

  ngOnInit(): void {
    this.todosSub = this.todosService.todosChanged.subscribe(
      (todos: Todo[]) => {
        this.todos = todos;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.todosSub) {
      this.todosSub.unsubscribe();
    }
  }
}
