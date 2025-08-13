import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo.model';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly apiBase = '/api'; // <— relative base

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiBase}/todos`);
  }

  addTodo(todo: any): Observable<Todo> {
    return this.http.post<Todo>(`${this.apiBase}/todos`, todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}/todos/${id}`);
  }
  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiBase}/${todo.id}`, todo);
  }
}
