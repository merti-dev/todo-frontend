import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  onLoginRoute = false;

  todos: any[] = [];
  newTitle = '';
  newContent=''

  constructor(private router: Router, private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (!token && !this.isLoginUrl(window.location.pathname)) {
      this.router.navigate(['/login']);
    }

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.onLoginRoute = this.isLoginUrl(e.urlAfterRedirects || e.url);
        if (!this.onLoginRoute) {
          this.loadTodos();
        }
      });
  }

  private isLoginUrl(url: string): boolean {
    return url.startsWith('/login');
  }

  loadTodos() {
    this.http.get<any[]>('/api/todos').subscribe(t => this.todos = t);
  }

  addTodo() {
    if (!this.newTitle.trim() && !this.newContent.trim()) return;

    this.http.post('/api/todos', {
      title: this.newTitle,
      content: this.newContent
    }).subscribe(() => {
      this.newTitle = '';
      this.newContent = '';
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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token') || !!sessionStorage.getItem('token');
  }

}
