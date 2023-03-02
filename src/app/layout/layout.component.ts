import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoActionsService } from '../todos/todo/todo-actions.service';
import { TodosService } from '../todos/todos.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  private statusSub: Subscription = Subscription.EMPTY;
  private todoIdSub: Subscription = Subscription.EMPTY;

  deleteStatus: boolean = false;
  id: number = 0;

  constructor(
    private todoActionsService: TodoActionsService,
    private todosService: TodosService
  ) {}

  ngOnInit(): void {
    this.statusSub = this.todoActionsService.currentStatus.subscribe(
      (status) => (this.deleteStatus = status)
    );
    this.todoIdSub = this.todoActionsService.currentTodoId.subscribe(
      (id) => (this.id = id)
    );
  }

  onCloseModal() {
    this.todoActionsService.changeStatus(!this.deleteStatus);
  }

  onDelete() {
    this.todosService.removeTodo(this.id);
    this.todoActionsService.changeStatus(!this.deleteStatus);
  }

  ngOnDestroy(): void {
    this.statusSub.unsubscribe();
    this.todoIdSub.unsubscribe();
  }
}
