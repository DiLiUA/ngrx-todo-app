import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
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

  @Effect()
  removeTodo$: Observable<Action> = this.actions$
    .ofType(TodosActions.REMOVE_TODO)
    .map(toPayload)
    .switchMap(payload =>
      this.todosService.removeTodo(payload)
        .map(todo => this.todosActions.removeTodoSuccess(todo))
    );

  @Effect()
  editTodo$: Observable<Action> = this.actions$
    .ofType(TodosActions.SEND_EDITED_TODO)
    .map(toPayload)
    .switchMap(payload =>
      this.todosService.editTodo(payload)
        .map(textTodo => this.todosActions.sendEditedTodoSuccess(textTodo))
    );
  constructor(private actions$: Actions, private todosService: TodosService, private todosActions: TodosActions) { }

}
