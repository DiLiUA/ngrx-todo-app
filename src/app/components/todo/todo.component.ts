import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';


import { TodosActions } from '../../actions/todos.actions';
import { Todo } from '../../models/todo';
import { TodosState } from '../../reducers/todos.reducer';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent {
  @Input() todo;
  @Input() editableTodo;
  @Output() editTodo = new EventEmitter();

  constructor(private store: Store<TodosState>, private actions: TodosActions) {
  }

  toggleDoneTodo(todo: Todo): void {
    this.store.dispatch(this.actions.toggleTodo(todo));
  }

  removeTodo(todo: Todo): void {
    if (!this.editableTodo) {
      this.store.dispatch(this.actions.removeTodo(todo));
    }
  }

  edit(todo: Todo): void {
    this.store.dispatch(this.actions.editTodo(todo));
    const editableText = this.editableTodo && this.editableTodo === todo ? '' : todo.text;

    this.editTodo.emit(editableText);
  }
}
