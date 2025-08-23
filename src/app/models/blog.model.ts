export interface BlogPost {
  id?: number;
  title: string;
  content: string;   // HTML string (Quill)
  createdAt: string;
}
