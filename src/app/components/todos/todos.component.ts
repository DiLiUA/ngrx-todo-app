import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { TodosActions } from '../../actions/todos.actions';
import { Todo } from '../../models/todo';
import { Filter, TodosState } from '../../reducers/todos.reducer';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html'
})
export class TodosComponent {
  textTodo: string;
  isEdit: boolean;
  editableTodo: Observable<Todo>;
  todoItems: Observable<Todo[]>;
  filters: Filter[];
  activeFilter: Observable<Filter>;

  constructor(private store: Store<TodosState>, private actions: TodosActions) {
    const todos: Observable<TodosState> = this.store.select('todos');

    this.textTodo = '';
    this.isEdit = false;
    this.filters = [{id: 1, title: 'All'}, {id: 2, title: 'Completed'}, {id: 3, title: 'Active'}];
    this.todoItems = todos.map(tds => {
      return tds.todoItems.filter(todo => {
        if (tds.activeFilter.title === 'All') {
          return todo;
        } else if (tds.activeFilter.title === 'Completed' && todo.isDone) {
          return todo;
        } else if (tds.activeFilter.title === 'Active' && !todo.isDone) {
          return todo;
        }
      });
    });
    this.editableTodo = todos.map(tds => tds.editableTodo);
    this.activeFilter = todos.map(tds => tds.activeFilter);
    this.store.dispatch(this.actions.getTodos());
  }

  submitTodo(evt: Event): void {
    evt.preventDefault();
    if (this.textTodo) {
      if (this.isEdit) {
        this.store.dispatch(this.actions.sendEditedTodo(this.textTodo));
        this.isEdit = false;
      } else {
        this.store.dispatch(this.actions.addTodo(this.textTodo));
      }

      this.textTodo = '';
    }
  }

  editTodo(text: string): void {
    this.isEdit = text ? true : false;
    this.textTodo = text;
  }

  changeFilter(filter: Filter): void {
    if (!this.isEdit) {
      this.store.dispatch(this.actions.changeFilter(filter));
    }
  }
}
