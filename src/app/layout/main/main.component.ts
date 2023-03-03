import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/todos/todo.model';
import { TodosService } from 'src/app/todos/todos.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  todosSub: Subscription = Subscription.EMPTY;
  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.todosSub = this.todosService.todosChanged.subscribe(
      (todos) => (this.todos = todos)
    );
  }

  ngOnDestroy(): void {
    this.todosSub.unsubscribe();
  }
}
