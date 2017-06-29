import { Action } from '@ngrx/store';

import { Todo } from '../models/todo';
import { TodosActions } from '../actions/todos.actions';

export interface Filter {
  id: number;
  title: string;
}

export interface TodosState {
  todoItems: Todo[];
  editableTodo: Todo;
  activeFilter: Filter;
}

const initialState: TodosState = {
  todoItems: [],
  editableTodo: null,
  activeFilter: {id: 1, title: 'All'}
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

    case TodosActions.SEND_EDITED_TODO_SUCCESS:
      return Object.assign({}, state, {
        todoItems: state.todoItems.map(todo => todo === state.editableTodo ? Object.assign({}, state.editableTodo, {text: action.payload}) : todo),
        editableTodo: null
      });

    case TodosActions.CHANGE_FILTER:
      return Object.assign({}, state, {activeFilter: action.payload});

    default:
      return state;
  }
}
