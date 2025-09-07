import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { EditorComponent } from './editor/editor.component';
import { BlogListComponent } from './blog/blog-list.component';
import { LoginComponent } from './login/login.component';
import { BlogDetailComponent } from './blog/blog-detail.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'editor', component: EditorComponent },
  { path: 'blog', component: BlogListComponent },
  { path: '', redirectTo: '/todo', pathMatch: 'full' },
  { path: 'blog/:id', component: BlogDetailComponent }
];
