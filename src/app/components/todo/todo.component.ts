import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent {
  @Input()  todo: Todo = {text: '', isDone: false};
  @Input()  editableTodo: Todo = null;
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter();
  @Output() remove: EventEmitter<Todo> = new EventEmitter();
  @Output() toggleDone: EventEmitter<Todo> = new EventEmitter();


  toggleDoneTodo(todo: Todo): void {
    if (!this.editableTodo) {
      this.toggleDone.emit(todo);
    }
  }

  removeTodo(todo: Todo): void {
    if (!this.editableTodo) {
      this.remove.emit(todo);
    }
  }

  edit(todo: Todo): void {
    this.editTodo.emit(todo);
  }
}
