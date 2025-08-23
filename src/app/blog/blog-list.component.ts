import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BlogPost } from '../models/blog.model';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="blog-container">
      <h1>📝 Blog</h1>
      <button (click)="goToEditor()">+ Yeni Yazı</button>

      <div *ngFor="let post of posts" class="blog-post">
        <h2>{{ post.title }}</h2>
        <small>{{ post.createdAt }}</small>
        <div [innerHTML]="post.content"></div>
      </div>
    </div>
  `
})
export class BlogListComponent implements OnInit {
  posts: BlogPost[] = [];

  constructor(private router: Router, private blogService: BlogService) {}

  ngOnInit() {
    this.posts = this.blogService.getAll();
  }

  goToEditor() {
    this.router.navigate(['/editor']);
  }
}
