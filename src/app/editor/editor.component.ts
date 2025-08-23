import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { Router } from '@angular/router';
import { BlogService } from '../services/blog.service';
import {BlogPost} from '../models/blog.model';

@Component({
  standalone: true,
  selector: 'app-editor',
  imports: [ReactiveFormsModule, QuillModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="save()" class="editor-form">
      <input
        formControlName="title"
        placeholder="Title"
        class="title-input"
      />

      <quill-editor
        formControlName="contentHtml"
        [format]="'html'"
        [modules]="modules"
        [styles]="{height:'300px'}">
      </quill-editor>

      <button type="submit" [disabled]="form.invalid" class="save-btn">
        Kaydet
      </button>
    </form>
  `,
  styles: [`
    .editor-form { display: flex; flex-direction: column; gap: 1rem; }
    .title-input { padding: 0.5rem; font-size: 1.2rem; }
    .save-btn { padding: 0.5rem 1rem; font-size: 1rem; }
  `]
})
export class EditorComponent {
  form;
  modules = {
    toolbar: [
      ['bold','italic','underline','code','code-block','blockquote'],
      [{ header:[1,2,3,false]}],
      [{ list:'ordered' }, { list:'bullet' }],
      ['link','clean']
    ],
    clipboard: { matchVisual: false }
  };

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      contentHtml: ['']
    });
  }

  save() {
    if (this.form.invalid) return;

    const raw = this.form.getRawValue();

    const newPost: BlogPost = {
      title: raw.title ?? '',
      content: raw.contentHtml ?? '',
      createdAt: new Date().toISOString()
    };

    this.blogService.add(newPost).subscribe({
      next: () => {
        this.form.reset();
        alert('Post added!');
      },
      error: (err) => console.error('Save error', err)
    });
  }

}
