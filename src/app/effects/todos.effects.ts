import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { TodosActions } from '../actions/todos.actions';
import { TodosService } from '../services/todos.service';

@Injectable()
export class TodosEffects {
  @Effect()
  getTodos$: Observable<Action> = this.actions$
    .ofType(TodosActions.GET_TODOS)
    .switchMap(() =>
      this.todosService.getTodos()
        .map(todos => this.todosActions.getTodosSuccess(todos))
    );

  @Effect()
  addTodo$: Observable<Action> = this.actions$
    .ofType(TodosActions.ADD_TODO)
    .map(toPayload)
    .switchMap(text =>
      this.todosService.addTodo(text)
        .map(todo => this.todosActions.addTodosSuccess(todo))
    );

  @Effect()
  toggleTodo$: Observable<Action> = this.actions$
    .ofType(TodosActions.TOGGLE_TODO)
    .map(toPayload)
    .switchMap(text =>
      this.todosService.toggleDoneTodo(text)
        .map(todo => this.todosActions.toggleTodoSuccess(todo))
    );

  constructor(private actions$: Actions, private todosService: TodosService, private todosActions: TodosActions) { }

}
