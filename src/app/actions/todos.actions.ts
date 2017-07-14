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
  static REMOVE_TODO = 'Remove todo';
  static REMOVE_TODO_SUCCESS = 'Remove todo success';
  static EDIT_TODO = 'Edit todo';
  static UPDATE_TODO = 'Update todo';
  static UPDATE_TODO_SUCCESS = 'Update todo success';
  static FILTER_TODOS = {
    All: 'Show all todos',
    Active: 'Show active todos',
    Completed: 'Show completed todos'
  };

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

  updateTodo(todo: {todo: Todo, text: string}): Action {
    return {
      type: TodosActions.UPDATE_TODO,
      payload: todo
    };
  }

  updateTodoSuccess(todo: Todo): Action {
    return {
      type: TodosActions.UPDATE_TODO_SUCCESS,
      payload: todo
    };
  }

  filterTodos(filter: string) {
    return {
      type: TodosActions.FILTER_TODOS[filter],
      payload: filter
    };
  }
}
