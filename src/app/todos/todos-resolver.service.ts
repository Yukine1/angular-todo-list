// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   Resolve,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { DataStorageService } from '../shared/data-storage.service';
// import { Todo } from './todo.model';
// import { TodosService } from './todos.service';

// @Injectable({ providedIn: 'root' })
// export class TodosResolverService implements Resolve<Todo[]> {
//   constructor(
//     private todosService: TodosService
//   ) // private dataStorageService: DataStorageService
//   {}

//   // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//   //   return this.todosService.setTodos();
//   // }
//   resolve(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Todo[] | Observable<Todo[]> | Promise<Todo[]> {
//     return this.todosService.setTodos();
//   }
// }
