import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Todo } from '../models/todo';

@Injectable()
export class TodosActions {
  static GET_TODOS = 'Get todos';
  static GET_TODOS_SUCCESS = 'Get todos success';
  static ADD_TODO = 'Add todo';
  static ADD_TODO_SUCCESS = 'Add todo success';
  static TOGGLE_TODO = 'Toggle todo';
  static TOGGLE_TODO_SUCCESS = 'Toggle todo success';

  getTodos(): Action {
    return {
      type: TodosActions.GET_TODOS
    };
  }

  getTodosSuccess(todos: Todo[]): Action {
    return {
      type: TodosActions.GET_TODOS_SUCCESS,
      payload: todos
    };
  }

  addTodo(text: string): Action {
    return {
      type: TodosActions.ADD_TODO,
      payload: text
    };
  }

  addTodosSuccess(todo: Todo): Action {
    return {
      type: TodosActions.ADD_TODO_SUCCESS,
      payload: todo
    };
  }

  toggleTodo(todo: Todo): Action {
    return {
      type: TodosActions.TOGGLE_TODO,
      payload: todo
    };
  }

  toggleTodoSuccess(todo: Todo): Action {
    return {
      type: TodosActions.TOGGLE_TODO_SUCCESS,
      payload: todo
    };
  }

}
