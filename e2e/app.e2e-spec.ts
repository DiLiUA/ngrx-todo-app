import { ElementArrayFinder, ElementFinder } from 'protractor';

import { NgrxTodoAppPage } from './app.po';
import { promise } from 'selenium-webdriver';
import Promise = promise.Promise;

describe('Todo list page', () => {
  const page: NgrxTodoAppPage = new NgrxTodoAppPage();
  const inputTodo: ElementFinder = page.getInputTodo();
  const btnAddTodo: ElementFinder = page.getBtnAddTodo();
  const filters: ElementArrayFinder = page.getFilters();
  const todos: ElementArrayFinder = page.getTodos();

  beforeEach(() => {
    page.navigateTo();
  });

  it ('display title', () => {
    expect(page.getParagraphText()).toEqual('Todo list');
  });

  it('add new todo', () => {
    const text: string = 'text todo';
    const todosLength: Promise<number> = todos.count().then(num => num + 1);

    inputTodo.sendKeys(text);
    btnAddTodo.click();

    expect(inputTodo.getAttribute('value')).toEqual('');
    expect(todos.last().getText()).toContain(text);
    expect(todos.count()).toEqual(todosLength);
  });

  it('edit todo', () => {
    const newText: string = 'new text todo';
    const todo: ElementFinder = todos.last();
    const todoText: Promise<string> = page.getTextTodo(todo);
    const editBtn: ElementFinder = page.getEditTodoBtn(todo);

    editBtn.click();

    expect(inputTodo.getAttribute('value')).toBe(todoText);
    expect(btnAddTodo.getText()).toBe('Edit');

    inputTodo.clear();
    inputTodo.sendKeys(newText);

    btnAddTodo.click();

    expect(inputTodo.getAttribute('value')).toBe('');
    expect(todo.getText()).toContain(newText);
  });

  it('uncheck edititing todo', () => {
    const todo: ElementFinder = todos.last();
    const textTodo: Promise<string> = page.getTextTodo(todo);
    const editBtn: ElementFinder = page.getEditTodoBtn(todo);

    editBtn.click();

    expect(inputTodo.getAttribute('value')).toBe(textTodo);
    expect(btnAddTodo.getText()).toBe('Edit');

    editBtn.click();

    expect(inputTodo.getAttribute('value')).toBe('');
    expect(btnAddTodo.getText()).toBe('Send');
  });

  it('remup edititing todo', () => {
    const todo: ElementFinder = todos.last();
    const todoText: Promise<string> = page.getTextTodo(todo);
    const editBtn: ElementFinder = page.getEditTodoBtn(todo);
    const nextTodo = todos.first();
    const nextTodoText: Promise<string> = page.getTextTodo(nextTodo);
    const nextEditBtn: ElementFinder = page.getEditTodoBtn(nextTodo);

    editBtn.click();

    expect(inputTodo.getAttribute('value')).toBe(todoText);
    expect(btnAddTodo.getText()).toBe('Edit');

    nextEditBtn.click();

    expect(inputTodo.getAttribute('value')).toBe(nextTodoText);
  });

  it('toggle todo', () => {
    const checkbox = page.getCheckboxTodo(todos.last());
    const isSelected: Promise<boolean> = checkbox.isSelected().then(flag => !flag);

    checkbox.click();

    expect(checkbox.isSelected()).toBe(isSelected);
  });

  it('not toggle todo', () => {
    const todo: ElementFinder = todos.last();
    const checkbox = page.getCheckboxTodo(todo);
    const isSelected: Promise<boolean> = checkbox.isSelected();
    const editBtn: ElementFinder = page.getEditTodoBtn(todo);

    editBtn.click();
    checkbox.click();

    expect(checkbox.isSelected()).toBe(isSelected);
  });

  it('remove todo', () => {
    const count: Promise<number> = todos.count().then(num => num - 1);
    const todo: ElementFinder = todos.first();
    const removeBtn: ElementFinder = page.getRemoveTodoBtn(todo);

    removeBtn.click();

    expect(todos.count()).toBe(count);
    expect(todos.first()).not.toEqual(todo);
  });

  it('not remove todo if we editing todo', () => {
    const count: Promise<number> = todos.count();
    const todo: ElementFinder = todos.last();
    const removeBtn: ElementFinder = page.getRemoveTodoBtn(todo);
    const editBtn: ElementFinder = page.getEditTodoBtn(todo);

    editBtn.click();
    removeBtn.click();

    expect(todos.count()).toBe(count);
  });

  it('show completed todo', () => {
    const completedTodo: Promise<number> = todos.filter(todo => page.getCheckboxTodo(todo).isSelected()).count();
    const completedFilter: ElementArrayFinder = filters.filter((todo, i) => todo.getText().then(text => text === 'Completed'));

    completedFilter.click();

    expect(todos.count()).toBe(completedTodo);
  });

  it('show active todo', () => {
    const activeTodo: Promise<number> =
      todos.filter((todo, i) => page.getCheckboxTodo(todo).isSelected().then(checked => !checked)).count();
    const activeFilter: ElementArrayFinder = filters.filter((todo, i) => todo.getText().then(text => text === 'Active'));

    activeFilter.click();

    expect(todos.count()).toBe(activeTodo);
  });

  it('not filter todo is we editing todo', () => {
    const todosCount: Promise<number> = todos.count();
    const activeFilter: ElementArrayFinder = filters.filter((todo, i) => todo.getText().then(text => text === 'Active'));
    const editBtn: ElementFinder = page.getEditTodoBtn(todos.last());

    editBtn.click();

    activeFilter.click();

    expect(todos.count()).toBe(todosCount);
  });

});
