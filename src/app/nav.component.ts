import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  template: `
  <nav class="topbar" *ngIf="show">
    <a routerLink="/todo" routerLinkActive="active">Todo</a>
    <a routerLink="/editor" routerLinkActive="active">Editor</a>
    <a routerLink="/blog" routerLinkActive="active">Blog</a>
  </nav>
  `,
  styles: [`
    .topbar{display:flex;gap:.8rem;align-items:center;padding:10px 16px;
      position:sticky;top:0;z-index:5;background:#fff;border-bottom:1px solid #eef2f7}
    .topbar a{color:#475569;text-decoration:none;padding:6px 10px;border-radius:10px;
      transition:background .2s,color .2s}
    .topbar a:hover{background:#f1f5f9}
    .topbar a.active{background:#e0e7ff;color:#3730a3;font-weight:600}
  `]
})
export class NavComponent {
  @Input() show = true;
}
