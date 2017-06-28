import { compose } from '@ngrx/core';
import { combineReducers } from '@ngrx/store';
import { todos } from './todos.reducer';

export interface State {
  todos;
}

export default compose(combineReducers)({
  todos,
});
