import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TodoActionsService } from 'src/app/todos/todo/todo-actions.service';
import { Todo } from '../todo.model';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnDestroy {
  statusSub: Subscription = Subscription.EMPTY;

  @Input() todo: Todo | undefined;
  @Input() id: number = 0;
  @Input() index: number = 0;

  editTodo: boolean = false;
  newTodoText: string = '';
  deleteStatus: boolean = false;

  inputForm = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(
    private todosService: TodosService,
    private todoActionsService: TodoActionsService
  ) {}

  ngOnInit(): void {
    this.statusSub = this.todoActionsService.currentStatus.subscribe(
      (status) => (this.deleteStatus = status)
    );
  }

  onToggle() {
    this.todosService.toggleTodo(this.id);
  }

  onEdit() {
    this.editTodo = !this.editTodo;
  }

  onSubmit() {
    const newTodoText = this.inputForm.get('text')?.value;
    if (newTodoText) {
      this.todosService.updateTodo(this.index, newTodoText);
      this.inputForm.get('text')?.setValue('');
    }
    this.editTodo = !this.editTodo;
  }

  onDelete() {
    this.todoActionsService.changeStatus(!this.deleteStatus);
    this.todoActionsService.setTodoId(this.id);
  }

  ngOnDestroy(): void {
    this.statusSub.unsubscribe();
  }
}
