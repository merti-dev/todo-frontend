import { Component, inject } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import {formatDate, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    FormsModule,
    NgForOf
  ]
})
export class AppComponent {
  private todoService = inject(TodoService);

  todos: Todo[] = [];
  newTitle: string = '';

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }

  addTodo() {
    if (!this.newTitle.trim()) return;

    const newTodo: Todo = {
      title: this.newTitle,
      completed: false,
      createdAt: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
    };

    this.todoService.addTodo(newTodo).subscribe((todo) => {
      this.todos.push(todo);
      this.newTitle = '';
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter((t) => t.id !== id);
    });
  }

  getTodoColor(todo: Todo): string {
    const createdDate = new Date(todo.createdAt);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays >= 3) return 'red';
    if (diffDays === 2) return 'yellow';
    return 'green';
  }
}
