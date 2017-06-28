import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { TodosState } from '../../reducers/todos.reducer';
import { TodosActions } from '../../actions/todos.actions';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent {
  @Input() todo: Todo;

  constructor(private store: Store<TodosState>, private actions: TodosActions) {
  }

  toggleDoneTodo(todo: Todo): void {
    this.store.dispatch(this.actions.toggleTodo(todo));
  }

}
