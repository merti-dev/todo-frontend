import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos: any[] = [];
  newTitle = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.http.get<any[]>('/api/todos').subscribe(t => this.todos = t);
  }

  addTodo() {
    if (!this.newTitle.trim()) return;
    this.http.post('/api/todos', { title: this.newTitle }).subscribe(() => {
      this.newTitle = '';
      this.loadTodos();
    });
  }

  deleteTodo(id: number) {
    this.http.delete(`/api/todos/${id}`).subscribe(() => {
      this.loadTodos();
    });
  }

  getTodoColor(todo: any) {
    const createdDate = new Date(todo.createdAt);
    const days = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'green';
    if (days === 1) return 'yellow';
    return 'red';
  }
}
