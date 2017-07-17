import { Todo } from '../models/todo';
import { TodosActions } from '../actions/todos.actions';
import { todos, TodosState } from './todos.reducer';

describe('Reducer. Todos', () => {
  const oldState: TodosState = {
    todoItems: [{text: 'test todo 1', isDone: true}, {text: 'test todo 2', isDone: false}],
    editableTodo: null,
  };

  it('should set array of todo return new state ', () => {
    const tds: Todo[] = [{text: 'test todo 1', isDone: true}, {text: 'test todo 2', isDone: false}, {text: 'test todo 3', isDone: false}];
    const action = {
      type: TodosActions.GET_TODOS_SUCCESS,
      payload: tds
    };

    const expectedValue = {
      todoItems: tds,
      editableTodo: null,
    };

    const newState = todos(oldState, action);

    expect(newState.todoItems).toEqual(expectedValue.todoItems);
    expect(newState).not.toEqual(oldState);
  });

  it('should add new todo and return new state ', () => {
    const todo: Todo = {text: 'add new todo', isDone: false};
    const action = {
      type: TodosActions.ADD_TODO_SUCCESS,
      payload: todo
    };

    const expectedValue = {
      todoItems: oldState.todoItems.concat(todo),
      editableTodo: null,
    };

    const newState = todos(oldState, action);

    expect(newState.todoItems).toEqual(expectedValue.todoItems);
    expect(newState).not.toEqual(oldState);
  });

  it('should toggle done todo and return new state ', () => {
    const action = {
      type: TodosActions.TOGGLE_TODO_SUCCESS,
      payload: oldState.todoItems[0]
    };

    const expectedValue = {
      todoItems: Object.assign([], oldState.todoItems, [Object.assign({}, oldState.todoItems[0], {isDone: !oldState.todoItems[0].isDone} )]),
      editableTodo: null,
    };

    const newState = todos(oldState, action);

    expect(newState.todoItems[0]).toEqual(expectedValue.todoItems[0]);
    expect(newState).not.toEqual(oldState);
  });

  it('should remove todo and return new state ', () => {
    const action = {
      type: TodosActions.REMOVE_TODO_SUCCESS,
      payload: oldState.todoItems[0]
    };

    const expectedValue = {
      todoItems: Object.assign([], oldState.todoItems),
      editableTodo: null,
    };

    expectedValue.todoItems.splice(0, 1);

    const newState = todos(oldState, action);

    expect(newState.todoItems.length).toEqual(expectedValue.todoItems.length);
    expect(newState).not.toEqual(oldState);
  });

  it('should set editable todo and return new state ', () => {
    const action = {
      type: TodosActions.EDIT_TODO,
      payload: oldState.todoItems[0]
    };

    const expectedValue = {
      todoItems: oldState.todoItems,
      editableTodo: oldState.todoItems[0],
    };

    const newState = todos(oldState, action);

    expect(newState.editableTodo).toEqual(expectedValue.editableTodo);
    expect(newState).not.toEqual(oldState);
  });

  it('should set editable todo to null and return new state ', () => {
    const state = Object.assign({}, oldState, {editableTodo: oldState.todoItems[0]});
    const action = {
      type: TodosActions.EDIT_TODO,
      payload: state.todoItems[0]
    };

    const expectedValue = {
      todoItems: state.todoItems,
      editableTodo: null,
    };

    const newState = todos(state, action);

    expect(newState.editableTodo).toEqual(expectedValue.editableTodo);
    expect(newState).not.toEqual(state);
  });

  it('should update todo and return new state ', () => {
    const state = Object.assign({}, oldState, {editableTodo: oldState.todoItems[0]});
    const payload = {todo: state.todoItems[0], text: 'new todo text'};

    const action = {
      type: TodosActions.UPDATE_TODO_SUCCESS,
      payload
    };

    const expectedValue = {
      todoItems: state.todoItems,
      editableTodo: null,
    };

    const newState = todos(state, action);

    expect(newState.editableTodo).toEqual(expectedValue.editableTodo);
    expect(newState.todoItems[0].text).toEqual(payload.text);
    expect(newState).not.toEqual(state);
  });


  it('should return default state', () => {
    expect(todos(oldState, {type: 'test type'})).toBe(oldState);
  });
});
