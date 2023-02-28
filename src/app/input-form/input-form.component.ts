import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
})
export class InputFormComponent {
  task = new FormControl('', [Validators.required, Validators.max(6)]);

  onSubmit() {
    console.log(this.task);
  }
}
