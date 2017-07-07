import { compose } from '@ngrx/core';
import { combineReducers } from '@ngrx/store';

import { todos, TodosState } from './todos.reducer';
import { filters, FiltersState } from './filters.reduser';

export interface State {
  todos: TodosState;
  filters: FiltersState;
}

export default compose(combineReducers)({
  todos,
  filters
});
