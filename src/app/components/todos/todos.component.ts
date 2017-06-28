import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { TodosActions } from '../../actions/todos.actions';
import { TodosState } from '../../reducers/todos.reducer';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html'
})
export class TodosComponent {
  textTodo: string;
  todos: Observable<TodosState>;
  todoItems: Observable<Todo[]>;

  constructor(private store: Store<TodosState>, private actions: TodosActions) {
    this.textTodo = '';
    this.todos = this.store.select('todos');
    this.todoItems = this.todos.map(todos => todos.todoItems);
    this.store.dispatch(this.actions.getTodos());
  }

  submitTodo(evt: Event): void {
    event.preventDefault();
    if (this.textTodo) {
      this.store.dispatch(this.actions.addTodo(this.textTodo));
      this.textTodo = '';
    }
  }
}
