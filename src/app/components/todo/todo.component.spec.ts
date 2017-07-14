import { TestBed } from '@angular/core/testing';

import { TodoComponent } from './todo.component';
import { Todo } from '../../models/todo';

describe('Component. TodoComponent', () => {
  let context: TodoComponent;
  const todo: Todo = {text: 'todo 1', isDone: true};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoComponent]
    });

    const fixture = TestBed.createComponent(TodoComponent);
    context = fixture.debugElement.componentInstance;
    context.todo = todo;

    spyOn(context.toggleDone, 'emit').and.returnValue(context.todo);
    spyOn(context.remove, 'emit').and.returnValue(context.todo);
    spyOn(context.editTodo, 'emit').and.returnValue(context.todo);
  });

  it('should emit toggle todo', () => {
    context.editableTodo = null;

    context.toggleDoneTodo(context.todo);

    expect(context.toggleDone.emit).toHaveBeenCalledTimes(1);
    expect(context.toggleDone.emit).toHaveBeenCalledWith(context.todo);
  });

  it('should not emit toggle todo', () => {
    context.editableTodo = {text: 'todo 1', isDone: true};

    context.toggleDoneTodo(context.todo);

    expect(context.toggleDone.emit).toHaveBeenCalledTimes(0);
  });

  it('should emit remove todo', () => {
    context.editableTodo = null;

    context.removeTodo(context.todo);

    expect(context.remove.emit).toHaveBeenCalledTimes(1);
    expect(context.remove.emit).toHaveBeenCalledWith(context.todo);
  });

  it('should not emit remove todo', () => {
    context.editableTodo = {text: 'todo 1', isDone: true};

    context.removeTodo(context.todo);

    expect(context.remove.emit).toHaveBeenCalledTimes(0);
  });

  it('should emit edit todo', () => {
    context.edit(context.todo);

    expect(context.editTodo.emit).toHaveBeenCalledTimes(1);
    expect(context.editTodo.emit).toHaveBeenCalledWith(context.todo);
  });
});
