import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';

import { TodosActions } from '../../actions/todos.actions';
import { Todo } from '../../models/todo';
import { TodosState } from '../../reducers/todos.reducer';
import { FiltersState } from '../../reducers/filters.reducer';
import { State } from '../../reducers/index.reducer';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html'
})
export class TodosComponent {
  textTodo: string;
  editableTodo: Todo = null;
  todos$: Observable<Todo[]>;
  filters$: Observable<FiltersState>;

  constructor(private store: Store<State>, private actions: TodosActions) {
    this.textTodo = '';

    const state$: Observable<{todos: TodosState, filters: FiltersState}> = Observable.combineLatest(
      this.store.select('todos'),
      this.store.select('filters'),
      (todos, filters) => ({todos, filters})
    );

    this.todos$ = state$.map((st: {todos: TodosState, filters: FiltersState}) => {
      this.editableTodo = st.todos.editableTodo;
      return st.filters.filter(st.todos.todoItems);
    });

    this.filters$ = state$.map(st => st.filters);
    this.store.dispatch(this.actions.getTodos());
  }

  submitTodo(evt: Event): void {
    evt.preventDefault();
    if (this.textTodo) {
      if (this.editableTodo) {
        const todo = Object.assign({},  this.editableTodo, {text: this.textTodo});
        this.store.dispatch(this.actions.updateTodo({todo: this.editableTodo, text: this.textTodo}));
      } else {
        this.store.dispatch(this.actions.addTodo(this.textTodo));
      }

      this.textTodo = '';
    }
  }

  removeTodo(todo: Todo) {
    this.store.dispatch(this.actions.removeTodo(todo));
  }

  toggleTodo(todo: Todo) {
    this.store.dispatch(this.actions.toggleTodo(todo));
  }

  editTodo(todo: Todo): void {
    this.store.dispatch(this.actions.editTodo(todo));
    this.textTodo = this.editableTodo ? todo.text : '';
  }

  filterTodos(filter: string) {
    if (!this.editableTodo) {
      this.store.dispatch(this.actions.filterTodos(filter));
    }
  }
}
