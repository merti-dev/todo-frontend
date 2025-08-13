import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo.model';
import { Observable } from 'rxjs';
import {environment} from '../environments/environments';


@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly apiBase = environment.apiBase;

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiBase}/todos`);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.apiBase}/todos`, todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}/todos/${id}`);
  }

  updateTodo(id: number, body: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiBase}/todos/${id}`, body);
  }

  patchTodo(id: number, body: Partial<Todo>): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiBase}/todos/${id}`, body);
  }
}
