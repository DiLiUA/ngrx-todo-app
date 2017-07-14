import { TestBed } from '@angular/core/testing';

import { TodosActions } from './todos.actions';
import { Todo } from '../models/todo';

describe('Actions. TodosActions', () => {
  const todo: Todo = {text: 'test todo 1', isDone: false};
  let actions: TodosActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodosActions]
    });

    actions = TestBed.get(TodosActions);
  });

  it('should return GET_TODOS action', () => {
    const expectedValue = {
      type: TodosActions.GET_TODOS
    };

    expect(actions.getTodos()).toEqual(expectedValue);
  });

  it('should return GET_TODOS_SUCCESS action', () => {
    const todos: Todo[] = [todo];
    const expectedValue = {
      type: TodosActions.GET_TODOS_SUCCESS,
      payload: todos
    };

    expect(actions.getTodosSuccess(todos)).toEqual(expectedValue);
  });

  it('should return ADD_TODO action', () => {
    const text = 'text new todo';
    const expectedValue = {
      type: TodosActions.ADD_TODO,
      payload: text
    };

    expect(actions.addTodo(text)).toEqual(expectedValue);
  });

  it('should return ADD_TODO_SUCCESS action', () => {
    const text = 'text new todo';
    const expectedValue = {
      type: TodosActions.ADD_TODO_SUCCESS,
      payload: {text, isDone: false}
    };

    expect(actions.addTodosSuccess({text, isDone: false})).toEqual(expectedValue);
  });

  it('should return TOGGLE_TODO action', () => {
    const expectedValue = {
      type: TodosActions.TOGGLE_TODO,
      payload: todo
    };

    expect(actions.toggleTodo(todo)).toEqual(expectedValue);
  });

  it('should return TOGGLE_TODO_SUCCESS action', () => {
    const expectedValue = {
      type: TodosActions.TOGGLE_TODO_SUCCESS,
      payload: todo
    };

    expect(actions.toggleTodoSuccess(todo)).toEqual(expectedValue);
  });

  it('should return REMOVE_TODO action', () => {
    const expectedValue = {
      type: TodosActions.REMOVE_TODO,
      payload: todo
    };

    expect(actions.removeTodo(todo)).toEqual(expectedValue);
  });

  it('should return REMOVE_TODO_SUCCESS action', () => {
    const expectedValue = {
      type: TodosActions.REMOVE_TODO_SUCCESS,
      payload: todo
    };

    expect(actions.removeTodoSuccess(todo)).toEqual(expectedValue);
  });

  it('should return EDIT_TODO action', () => {
    const expectedValue = {
      type: TodosActions.EDIT_TODO,
      payload: todo
    };

    expect(actions.editTodo(todo)).toEqual(expectedValue);
  });

  it('should return UPDATE_TODO action', () => {
    const payload = {todo, text: 'new text'};
    const expectedValue = {
      type: TodosActions.UPDATE_TODO,
      payload
    };

    expect(actions.updateTodo(payload)).toEqual(expectedValue);
  });

  it('should return UPDATE_TODO_SUCCESS action', () => {
    const expectedValue = {
      type: TodosActions.UPDATE_TODO_SUCCESS,
      payload: todo
    };

    expect(actions.updateTodoSuccess(todo)).toEqual(expectedValue);
  });

  it('should return FILTER_TODOS["All"] action', () => {
    const filter = 'All';
    const expectedValue = {
      type: TodosActions.FILTER_TODOS[filter],
      payload: filter
    };

    expect(actions.filterTodos(filter)).toEqual(expectedValue);
  });

  it('should return FILTER_TODOS["Completed"] action', () => {
    const filter = 'Completed';
    const expectedValue = {
      type: TodosActions.FILTER_TODOS[filter],
      payload: filter
    };

    expect(actions.filterTodos(filter)).toEqual(expectedValue);
  });

  it('should return FILTER_TODOS["Active"] action', () => {
    const filter = 'Active';
    const expectedValue = {
      type: TodosActions.FILTER_TODOS[filter],
      payload: filter
    };

    expect(actions.filterTodos(filter)).toEqual(expectedValue);
  });

});
