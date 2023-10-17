import { Component } from '@angular/core';

interface TodoItem {
  text: string;
  completed: boolean;
}
@Component({
  selector: 'app-app-todo-list',
  templateUrl: './app-todo-list.component.html',
  styleUrls: ['./app-todo-list.component.css']
})
export class AppTodoListComponent {
  todos: TodoItem[] = [];
  newTodo: string = '';

  addTodo() {
    if (this.newTodo.trim() !== '') {
      this.todos.push({ text: this.newTodo, completed: false });
      this.newTodo = '';
    }
  }
}
