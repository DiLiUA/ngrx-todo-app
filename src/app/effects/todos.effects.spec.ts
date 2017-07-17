import { TestBed } from '@angular/core/testing';

import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { TodosEffects } from './todos.effects';
import { TodosService } from '../services/todos.service';
import { TodosActions } from '../actions/todos.actions';
import { Todo } from '../models/todo';

describe('Effects. TodosEffects', () => {
  let runner: EffectsRunner;
  let effect: TodosEffects;
  let service: TodosService;
  let actions: TodosActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodosEffects,
        TodosService,
        TodosActions,
      ],
      imports: [
        EffectsTestingModule
      ],
    });

    runner = TestBed.get(EffectsRunner);
    effect = TestBed.get(TodosEffects);
    service = TestBed.get(TodosService);
    actions = TestBed.get(TodosActions);
  });

  it('should return a GET_TODOS_SUCCESS action with todo list', () => {
    const todos: Todo[] = [
      {text: 'test 1', isDone: true},
      {text: 'test 2', isDone: false},
      {text: 'test 3', isDone: false}
    ];

    const expectedTodos = {
      type: TodosActions.GET_TODOS_SUCCESS,
      payload: todos
    };

    spyOn(service, 'getTodos').and.returnValue(Observable.of(todos));

    runner.queue(actions.getTodos());

    effect.getTodos$.subscribe(data => {
      expect(data).toEqual(expectedTodos);
    });
  });


 it('should return ADD_TODO_SUCCESS action', () => {
    const text = 'new todo';
    const todo: Todo = {text, isDone: false};

    spyOn(service, 'addTodo').and.returnValue(Observable.of(todo));

    const expectedTodos = {
      type: TodosActions.ADD_TODO_SUCCESS,
      payload: todo
    };

    runner.queue(actions.addTodo(text));

    effect.addTodo$.subscribe(data => {
      expect(data).toEqual(expectedTodos);
    });
  });

  it('should return TOGGLE_TODO_SUCCESS action', () => {
    const todo: Todo = {text: 'todo 1', isDone: false};

    spyOn(service, 'toggleDoneTodo').and.returnValue(Observable.of(todo));

    const expectedTodos = {
      type: TodosActions.TOGGLE_TODO_SUCCESS,
      payload: todo
    };

    runner.queue(actions.toggleTodo(todo));

    effect.toggleTodo$.subscribe(data => {
      expect(data).toEqual(expectedTodos);
    });
  });

  it('should return REMOVE_TODO_SUCCESS action', () => {
    const todo: Todo = {text: 'todo 1', isDone: false};

    spyOn(service, 'removeTodo').and.returnValue(Observable.of(todo));

    const expectedTodos = {
      type: TodosActions.REMOVE_TODO_SUCCESS,
      payload: todo
    };

    runner.queue(actions.removeTodo(todo));

    effect.removeTodo$.subscribe(data => {
      expect(data).toEqual(expectedTodos);
    });
  });

  it('should return UPDATE_TODO_SUCCESS action', () => {
    const payload = {
      todo: {text: 'test todo', isDone: false},
      text: 'new text'
    };

    spyOn(service, 'editTodo').and.returnValue(Observable.of(payload));

    const expectedTodos = {
      type: TodosActions.UPDATE_TODO_SUCCESS,
      payload
    };

    runner.queue(actions.updateTodo(payload));

    effect.editTodo$.subscribe(data => {
      expect(data).toEqual(expectedTodos);
    });
  });

});
