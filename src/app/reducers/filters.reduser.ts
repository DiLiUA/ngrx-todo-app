import { Action } from '@ngrx/store';

import { TodosActions } from '../actions/todos.actions';
import { Todo } from '../models/todo';

export interface FiltersState {
  filters: string[];
  activeFilter: string;
  filter: Function;
}

const initialState: FiltersState = {
  filters: ['All', 'Active', 'Completed'],
  activeFilter: 'All',
  filter: (todos: Todo[]): Todo[] => todos
};

export function filters(state = initialState, action: Action): FiltersState {
  switch (action.type) {
    case TodosActions.FILTER_TODOS.All:
          return Object.assign({}, state, {activeFilter: action.payload,
            filter: (todos: Todo[]): Todo[] => todos
          });

    case TodosActions.FILTER_TODOS.Active:
      return Object.assign({}, state, {activeFilter: action.payload,
        filter: (todos: Todo[]): Todo[] => todos.filter((todo: Todo) => !todo.isDone)
      });

    case TodosActions.FILTER_TODOS.Completed:
      return Object.assign({}, state, {activeFilter: action.payload,
        filter: (todos: Todo[]): Todo[] => todos.filter((todo: Todo) => todo.isDone)
      });

    default:
      return state;
  }
}
