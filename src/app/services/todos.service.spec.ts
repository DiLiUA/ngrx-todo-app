import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { TodosService } from './todos.service';
import { Todo } from '../models/todo';

describe('Servise. TodosService', () => {
  let service: TodosService;

  const todos: Todo[] = [{text: 'todo 1', isDone: false}, {text: 'todo 2', isDone: true}];
  const todo: Todo = {text: 'test todo', isDone: false};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodosService]
    });

    service = TestBed.get(TodosService);
    service.todos = todos;


  });

  it('should return Observable of todos', () => {
    const expectedValue: Observable<Todo[]> = Observable.of(todos);

    expect(service.getTodos()).toEqual(expectedValue);
  });

  it('should return Observable of new todo', () => {
    const text = 'new Todo';
    const addingTodo: Todo = {text, isDone: false};
    const expectedValue: Observable<Todo> = Observable.of(addingTodo);

    expect(service.addTodo(text)).toEqual(expectedValue);
  });

  it('should return Observable of toggled todo', () => {
    const expectedValue: Observable<Todo> = Observable.of(todo);

    expect(service.toggleDoneTodo(todo)).toEqual(expectedValue);
  });

  it('should return Observable of removing todo', () => {
    const expectedValue: Observable<Todo> = Observable.of(todo);

    expect(service.removeTodo(todo)).toEqual(expectedValue);
  });

  it('should return Observable of editing todo', () => {
    const expectedValue: Observable<Todo> = Observable.of(todo);

    expect(service.editTodo(todo)).toEqual(expectedValue);
  });
});
