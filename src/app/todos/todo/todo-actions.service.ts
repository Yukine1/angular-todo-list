import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoActionsService {
  statusSourse = new BehaviorSubject<boolean>(false);
  currentStatus = this.statusSourse.asObservable();

  todoIdSourse = new BehaviorSubject<number>(0);
  currentTodoId = this.todoIdSourse.asObservable();

  constructor() {}

  setTodoId(id: number) {
    this.todoIdSourse.next(id);
  }

  changeStatus(status: boolean) {
    this.statusSourse.next(status);
  }
}
