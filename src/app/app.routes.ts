import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { EditorComponent } from './editor/editor.component';
import { BlogListComponent } from './blog/blog-list.component';
import { LoginComponent } from './login/login.component';
import { BlogDetailComponent } from './blog/blog-detail.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'todo', component: TodoComponent, canActivate: [authGuard] },
  { path: 'editor', component: EditorComponent, canActivate: [authGuard] },
  { path: 'blog', component: BlogListComponent, canActivate: [authGuard] },
  { path: 'blog/:id', component: BlogDetailComponent, canActivate: [authGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'todo' },
  { path: '**', redirectTo: 'todo' }
];
