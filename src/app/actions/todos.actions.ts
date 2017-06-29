import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Todo } from '../models/todo';
import { Filter } from '../reducers/todos.reducer';

@Injectable()
export class TodosActions {
  static GET_TODOS = 'Get todos';
  static GET_TODOS_SUCCESS = 'Get todos success';
  static ADD_TODO = 'Add todo';
  static ADD_TODO_SUCCESS = 'Add todo success';
  static TOGGLE_TODO = 'Toggle todo';
  static TOGGLE_TODO_SUCCESS = 'Toggle todo success';
  static REMOVE_TODO = 'Remove todo';
  static REMOVE_TODO_SUCCESS = 'Remove todo success';
  static EDIT_TODO = 'Edit todo';
  static SEND_EDITED_TODO = 'Send edited todo';
  static SEND_EDITED_TODO_SUCCESS = 'Send edited todo success';
  static CHANGE_FILTER = 'Change filter';

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

  removeTodo(todo: Todo): Action {
    return {
      type: TodosActions.REMOVE_TODO,
      payload: todo
    };
  }

  removeTodoSuccess(todo: Todo): Action {
    return {
      type: TodosActions.REMOVE_TODO_SUCCESS,
      payload: todo
    };
  }

  editTodo(todo: Todo): Action {
    return {
      type: TodosActions.EDIT_TODO,
      payload: todo
    };
  }

  sendEditedTodo(textTodo: string): Action {
    return {
      type: TodosActions.SEND_EDITED_TODO,
      payload: textTodo
    };
  }

  sendEditedTodoSuccess(textTodo: Todo): Action {
    return {
      type: TodosActions.SEND_EDITED_TODO_SUCCESS,
      payload: textTodo
    };
  }

  changeFilter(filter: Filter): Action {
    return {
      type: TodosActions.CHANGE_FILTER,
      payload: filter
    };
  }
}
