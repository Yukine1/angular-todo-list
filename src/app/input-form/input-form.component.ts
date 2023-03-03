import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodosService } from '../todos/todos.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
})
export class InputFormComponent {
  inputForm = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(private todosService: TodosService) {}

  onSubmit() {
    const todoText = this.inputForm.get('text')?.value;
    if (todoText) {
      this.todosService.addTodo(todoText);
      this.inputForm.get('text')?.setValue('');
    }
  }
}
