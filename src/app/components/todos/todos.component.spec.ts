import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';

import { TodosComponent } from './todos.component';
import { TodoComponent } from '../todo/todo.component';
import { TodosActions } from '../../actions/todos.actions';
import { State } from '../../reducers/index.reducer';
import { TodosState } from '../../reducers/todos.reducer';
import { Todo } from '../../models/todo';
import { MockStore } from '../../mocks/store.mock';
import Spy = jasmine.Spy;

const initialState = {
  todos: {
    todoItems: [],
    editableTodo: null,
  },
  filters: {
    filters: ['All', 'Active', 'Completed'],
    activeFilter: 'All',
    filter: (todos: Todo[]): Todo[] => todos
  }
};

describe('Component. TodosComponent', () => {
  let context: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let store: Store<TodosState>;
  let actions: TodosActions;
  let dispatchSpy: Spy;
  const todo: Todo = {text: 'text todo', isDone: false};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodosComponent,
        TodoComponent
      ],
      imports: [
        FormsModule,

      ],
      providers: [
        TodosActions,
        {provide: Store, useValue: new MockStore<State>(initialState)}
      ]
    });

    fixture = TestBed.createComponent(TodosComponent);
    context = fixture.debugElement.componentInstance;
    store = TestBed.get(Store);
    actions = TestBed.get(TodosActions);
    dispatchSpy = spyOn(store, 'dispatch').and.callFake(() => {});
    fixture.detectChanges();
  });
  //
  it('should add new todo', () => {
    const text = 'new todo';
    context.editableTodo = null;
    context.textTodo = text;

    spyOn(actions, 'addTodo').and.returnValue({type: 'add todo', payload: text});

    context.submitTodo(new Event('customClick'));

    expect(dispatchSpy).toHaveBeenCalledWith(actions.addTodo(context.textTodo));
  });

  it('should update todo', () => {
    const text = 'new text todo';
    context.editableTodo = todo;
    context.textTodo = text;

    spyOn(actions, 'updateTodo').and.returnValue({type: 'update todo', payload: Object.assign({}, todo, {text})});

    context.submitTodo(new Event('customClick'));

    expect(dispatchSpy).toHaveBeenCalledWith(actions.updateTodo(todo));
  });

  it('should ignore add new todo or update todo', () => {
    context.editableTodo = null;
    context.textTodo = '';

    spyOn(actions, 'addTodo').and.returnValue({type: 'add todo', payload: 'text'});

    context.submitTodo(new Event('customClick'));

    expect(dispatchSpy).toHaveBeenCalledTimes(0);
  });

  it('should remove todo', () => {
    spyOn(actions, 'removeTodo').and.returnValue({type: 'remove todo', payload: todo});

    context.removeTodo(todo);

    expect(dispatchSpy).toHaveBeenCalledWith(actions.removeTodo(todo));
  });

  it('should toggle todo', () => {
    spyOn(actions, 'toggleTodo').and.returnValue({type: 'toggle todo', payload: todo});

    context.toggleTodo(todo);

    expect(dispatchSpy).toHaveBeenCalledWith(actions.toggleTodo(todo));
  });

  it('should edit todo if context.editableTodo is null', () => {
    spyOn(actions, 'editTodo').and.returnValue({type: 'edit todo', payload: todo});

    context.editTodo(todo);

    expect(dispatchSpy).toHaveBeenCalledWith(actions.editTodo(todo));
    expect(context.textTodo).toEqual('');
  });

  it('should edit todo if context.editableTodo is todo', () => {
    context.editableTodo = todo;
    spyOn(actions, 'editTodo').and.returnValue({type: 'edit todo', payload: todo});

    context.editTodo(todo);

    expect(dispatchSpy).toHaveBeenCalledWith(actions.editTodo(todo));
    expect(context.textTodo).toEqual(todo.text);
  });

  it('should filterTodos', () => {
    const filter = 'Active';
    context.editableTodo = null;
    spyOn(actions, 'filterTodos').and.returnValue({type: 'filter todo', payload: filter});

    context.filterTodos(filter);

    expect(dispatchSpy).toHaveBeenCalledWith(actions.filterTodos(filter));
  });

  it('should not filterTodos', () => {
    const filter = 'Active';
    context.editableTodo = todo;
    spyOn(actions, 'filterTodos').and.returnValue({type: 'filter todo', payload: filter});

    context.filterTodos(filter);

    expect(dispatchSpy).toHaveBeenCalledTimes(0);
  });
});
