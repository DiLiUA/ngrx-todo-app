import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Todo } from '../models/todo';

@Injectable()
export class TodosService {
  todos: Todo[];

  constructor() {
    this.todos = [{text: 'todo 1', isDone: false}, {text: 'todo 2', isDone: true}, {text: 'todo 3', isDone: false}];
  }

  getTodos(): Observable<Todo[]> {
    return Observable.of(this.todos);
  }

  addTodo(text: string): Observable<Todo> {
    return Observable.of({text, isDone: false});
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
