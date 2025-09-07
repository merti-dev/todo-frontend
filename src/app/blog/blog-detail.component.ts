 import {Component, OnInit, inject, signal} from  '@angular/core'
 import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'blog-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (todo(); as t) {
      <div class="blog-detail">
        <h1>{{ t.title }}</h1>
        <small>{{ formatDateTime(t.createdAt) }}</small>
        <div [innerHTML]="t.content"></div>
      </div>
    } @else {
      <p>Loading...</p>
    }
  `,
  styles: [`
    .blog-detail {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
      border-radius: 16px;
      background: #fff;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      font-family: system-ui, sans-serif;
    }

    .blog-detail h1 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #1e293b;
    }

    .blog-detail small {
      display: block;
      margin-bottom: 1.5rem;
      color: #64748b;
      font-size: 0.9rem;
    }

    .blog-detail div[innerHTML] {
      line-height: 1.7;
      font-size: 1rem;
      color: #334155;
    }

    .blog-detail div[innerHTML] p {
      margin: 0.5rem 0;
    }

    .blog-detail div[innerHTML] code {
      background: #f1f5f9;
      padding: 0.2rem 0.4rem;
      border-radius: 6px;
      font-family: monospace;
    }

    .blog-detail div[innerHTML] blockquote {
      margin: 1rem 0;
      padding-left: 1rem;
      border-left: 4px solid #3b82f6;
      color: #475569;
      font-style: italic;
    }
  `]

})
 export class BlogDetailComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  todo = signal<any | null>(null)
  formatDateTime(dateString: string): string {
    const d = new Date(dateString);
    return d.toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id){
      this.http.get(`/api/todos/${id}`).subscribe(
        res=>this.todo.set(res)
      );
    }
  }
}
