import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [ReactiveFormsModule, QuillModule, CommonModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="save()" class="editor-form">
      <select id="todoSelect" formControlName="todoId" (change)="loadContent()">
        @for (t of todos(); track t.id) {
          <option [value]="t.id">{{ t.title }}</option>
        }
      </select>

      <quill-editor
        formControlName="contentHtml"
        [format]="'html'"
        [modules]="modules"
        [styles]="{height:'300px'}">
      </quill-editor>

      <button type="submit" [disabled]="form.invalid">Save</button>
    </form>
  `,
  styles: [`
    .editor-form { display: flex; flex-direction: column; gap: 1rem; }
    select { padding: 0.5rem; font-size: 1rem; }
    button { padding: 0.5rem 1rem; font-size: 1rem; cursor: pointer; }
  `]
})
export class EditorComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  // Angular 20 signals
  todos = signal<any[]>([]);

  form = this.fb.group({
    todoId: ['', Validators.required],
    contentHtml: ['']
  });

  modules = {
    toolbar: [
      ['bold','italic','underline','code','blockquote'],
      [{ header:[1,2,3,false]}],
      [{ list:'ordered' }, { list:'bullet' }],
      ['link','clean']
    ]
  };

  ngOnInit() {
    this.http.get<any[]>('/api/todos').subscribe(res => {
      this.todos.set(res);
    });
  }

  loadContent() {
    const id = this.form.value.todoId;
    const selected = this.todos().find(t => t.id == id);
    if (selected) {
      this.form.patchValue({ contentHtml: selected.content || '' });
    }
  }

  save() {
    const { todoId, contentHtml } = this.form.getRawValue();
    if (!todoId) return;

    const selected = this.todos().find(t => t.id == todoId);
    if (!selected) return;

    this.http.put(`/api/todos/${todoId}`, {
      title: selected.title,
      content: contentHtml,
      completed: selected.completed
    }).subscribe(() => {
      alert('Content saved!');
    });
  }
}
