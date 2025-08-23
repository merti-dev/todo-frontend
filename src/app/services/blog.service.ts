import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BlogPost } from '../models/blog.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private posts: BlogPost[] = [];

  getAll(): BlogPost[] {
    return this.posts;
  }

  add(post: BlogPost): Observable<BlogPost> {
    post.id = this.posts.length + 1;
    post.createdAt = new Date().toISOString().split('T')[0];
    this.posts.unshift(post); // en üste ekle
    return of(post); // Return an Observable
  }
}
