import { Action } from '@ngrx/store';

import { Todo } from '../models/todo';
import { TodosActions } from '../actions/todos.actions';

export interface TodosState {
  todoItems: Todo[];
}

const initialState: TodosState = {
  todoItems: []
};

export function todos(state: TodosState = initialState, action: Action): TodosState {
  switch (action.type) {
    case TodosActions.GET_TODOS_SUCCESS:
      return Object.assign({}, state, {todoItems: action.payload});

    case TodosActions.ADD_TODO_SUCCESS:
      return Object.assign({}, state, {todoItems: state.todoItems.concat(action.payload)});

    case TodosActions.TOGGLE_TODO_SUCCESS:

      const newtodoItems = state.todoItems.map(todo => {
        if (todo === action.payload) {
          return Object.assign({}, todo, {isDone: !todo.isDone});
        }
        return todo;
      });

      return Object.assign({}, state, {todoItems: newtodoItems});

    default:
      return state;
  }
}

