import { filters, FiltersState } from './filters.reducer';
import { Todo } from '../models/todo';
import { TodosActions } from '../actions/todos.actions';

describe('Reducer. Filters', () => {
  const todoItems: Todo[] = [{text: 'todo 1', isDone: false}, {text: 'todo2', isDone: true}];
  const oldState: FiltersState = {
    filters: ['All', 'Active', 'Completed'],
    activeFilter: 'All',
    filter: (todos: Todo[]): Todo[] => todos
  };

  it('should set activeFilter = Active  and filter function. should return new state ', () => {
    const filter = 'Active';
    const action = {
      type: TodosActions.FILTER_TODOS[filter],
      payload: filter
    };

    const expectedValue = {
      filters: ['All', 'Active', 'Completed'],
      activeFilter: filter,
      filter: (todos: Todo[]): Todo[] => todos.filter((todo: Todo) => !todo.isDone)
    };

    const newState = filters(oldState, action);

    expect(newState.filter(todoItems)).toEqual(expectedValue.filter(todoItems));
    expect(newState.filter(todoItems)).not.toEqual(oldState.filter(todoItems));
    expect(newState.activeFilter).toEqual(expectedValue.activeFilter);
    expect(newState.activeFilter).not.toEqual(oldState.activeFilter);
  });

  it('should set activeFilter = Completed and filter function. should return new state ', () => {
    const filter = 'Completed';
    const action = {
      type: TodosActions.FILTER_TODOS[filter],
      payload: filter
    };

    const expectedValue = {
      filters: ['All', 'Active', 'Completed'],
      activeFilter: filter,
      filter: (todos: Todo[]): Todo[] => todos.filter((todo: Todo) => todo.isDone)
    };

    const newState = filters(oldState, action);

    expect(newState.filter(todoItems)).toEqual(expectedValue.filter(todoItems));
    expect(newState.filter(todoItems)).not.toEqual(oldState.filter(todoItems));
    expect(newState.activeFilter).toEqual(expectedValue.activeFilter);
    expect(newState.activeFilter).not.toEqual(oldState.activeFilter);
  });

  it('should set activeFilter = All  and filter function. should return new state ', () => {
    const filter = 'All';
    const action = {
      type: TodosActions.FILTER_TODOS[filter],
      payload: filter
    };

    const state: FiltersState = {
      filters: ['All', 'Active', 'Completed'],
      activeFilter: 'Active',
      filter: (todos: Todo[]): Todo[] => todos.filter((todo: Todo) => !todo.isDone)
    };

    const expectedValue = {
      filters: ['All', 'Active', 'Completed'],
      activeFilter: filter,
      filter: (todos: Todo[]): Todo[] => todos
    };

    const newState = filters(oldState, action);

    expect(newState.filter(todoItems)).toEqual(expectedValue.filter(todoItems));
    expect(newState.filter(todoItems)).not.toEqual(state.filter(todoItems));
    expect(newState.activeFilter).toEqual(expectedValue.activeFilter);
    expect(newState.activeFilter).not.toEqual(state.activeFilter);
  });

  it('should return default state', () => {
    oldState.filter(todoItems);
    expect(filters(oldState, {type: 'test type'})).toBe(oldState);
  });
});
