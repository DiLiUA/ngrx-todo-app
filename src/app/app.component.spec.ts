import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodosEffects } from './effects/todos.effects';
import { TodosActions } from './actions/todos.actions';
import { TodosService } from './services/todos.service';
import rootReducer from './reducers/index.reducer';

describe('Component. AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
