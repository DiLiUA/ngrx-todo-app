import { $, $$, browser, ElementArrayFinder, ElementFinder } from 'protractor';
import { promise } from 'selenium-webdriver';
import Promise = promise.Promise;

export class NgrxTodoAppPage {

  navigateTo(): Promise<string>  {
    return browser.get('/');
  }

  getParagraphText(): Promise<string>  {
    return $('app-todos h3').getText();
  }

  getTodos() {
    return $$('app-todo > div');
  }

  getRemoveTodoBtn(todo: ElementFinder): ElementFinder {
    return todo.$('.remove-icon');
  }

  getEditTodoBtn(todo: ElementFinder): ElementFinder {
    return todo.$('.edit-icon');
  }

  getCheckboxTodo(todo: ElementFinder): ElementFinder {
    return todo.$('input[type="checkbox"]');
  }

  getTextTodo(todo: ElementFinder): Promise<string> {
    return todo.$('label').getText();
  }

  getFilters(): ElementArrayFinder {
    return $$('.filters li');
  }

  getInputTodo() {
    return $('app-todos input[name="todo"]');
  }

  getBtnAddTodo() {
    return $('app-todos button[type="submit"]');
  }
}
