import { Action } from '@ngrx/store';

import { Todo } from '../models/todo';
import { TodosActions } from '../actions/todos.actions';

export interface TodosState {
  todoItems: Todo[];
  editableTodo: Todo;
}

const initialState: TodosState = {
  todoItems: [],
  editableTodo: null,
};

export function todos(state = initialState, action: Action): TodosState {
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

    case TodosActions.REMOVE_TODO_SUCCESS:
      return Object.assign({}, state, {todoItems: state.todoItems.filter(todo => todo !== action.payload)});


    case TodosActions.EDIT_TODO:
      return Object.assign({}, state, {editableTodo: state.editableTodo && state.editableTodo === action.payload ? null : action.payload});

    case TodosActions.UPDATE_TODO_SUCCESS:
      return Object.assign({}, state, {
        todoItems: state.todoItems.map(todo => todo === state.editableTodo ? Object.assign({}, action.payload.todo, {text: action.payload.text}) : todo),
        editableTodo: null
      });

    default:
      return state;
  }
}
