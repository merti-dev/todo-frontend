import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  todos:any[] = [];
  newTitle = '';
  newContent = '';
  detailsOpen = false;

  openId:number|null = null;

  // edit state
  editId:number|null = null;
  editTitle = '';
  editContent = '';

  constructor(private http:HttpClient) { this.loadTodos(); }

  toggleDetails(){ this.detailsOpen = !this.detailsOpen; }

  loadTodos(){
    this.http.get<any[]>('/api/todos').subscribe(t => this.todos = t);
  }

  addTodo(){
    const title = this.newTitle.trim();
    if (!title) return;
    const body:any = { title };
    if (this.newContent.trim()) body.content = this.newContent;
    this.http.post('/api/todos', body).subscribe(() => {
      this.newTitle = ''; this.newContent = ''; this.detailsOpen = false;
      this.loadTodos();
    });
  }

  deleteTodo(id:number){
    this.http.delete(`/api/todos/${id}`).subscribe(() => this.loadTodos());
  }

  toggleOpen(id:number){ this.openId = this.openId === id ? null : id; }

  startEdit(todo:any){
    this.openId = todo.id;
    this.editId = todo.id;
    this.editTitle = todo.title;
    this.editContent = todo.content || '';
  }

  cancelEdit(){ this.editId = null; this.editTitle = ''; this.editContent = ''; }

  saveEdit(id:number){
    const body = { title: this.editTitle.trim(), content: this.editContent };
    this.http.put(`/api/todos/${id}`, body).subscribe(() => {
      this.cancelEdit();
      this.loadTodos();
    });
  }
}
