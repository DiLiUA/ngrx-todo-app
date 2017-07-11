import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { TodosComponent } from './components/todos/todos.component';
import rootReducer from './reducers/index.reducer';
import { TodosActions } from './actions/todos.actions';
import { TodosService } from './services/todos.service';
import { TodosEffects } from './effects/todos.effects';
import { TodoComponent } from './components/todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.provideStore(rootReducer),
    StoreDevtoolsModule.instrumentStore({
      maxAge: 5
    }),
    EffectsModule.run(TodosEffects)
  ],
  providers: [TodosActions, TodosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
