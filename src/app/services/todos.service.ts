import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Todo } from '../models/todo';

@Injectable()
export class TodosService {
  todos: Todo[];

  constructor() {
    this.todos = [{text: 'todo 1', isDone: false, id: 1}, {text: 'todo 2', isDone: true, id: 2}, {text: 'todo 3', isDone: false, id: 3}];
  }

  getTodos(): Observable<Todo[]> {
    return Observable.of(this.todos);
  }

  addTodo(text: string): Observable<Todo> {
    return Observable.of({text, isDone: false, id: Date.now()});
  }

  toggleDoneTodo(todo: Todo): Observable<Todo> {
    return Observable.of(todo);
  }

  removeTodo(todo: Todo): Observable<Todo> {
    return Observable.of(todo);
  }

  editTodo(todo: Todo): Observable<Todo> {
    return Observable.of(todo);
  }
}
