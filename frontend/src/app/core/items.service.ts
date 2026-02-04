import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API = 'http://localhost:3000/api';

export interface Item {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  category?: string | null;
  created_at?: string;
  user_name: string;
}

@Injectable({ providedIn: 'root' })
export class ItemsService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Item[]>(`${API}/items`);
  }

  get(id: number) {
    return this.http.get<Item>(`${API}/items/${id}`);
  }

  create(data: { title: string; description?: string }) {
    return this.http.post<Item>(`${API}/items`, data);
  }

  update(id: number, data: { title: string; description?: string }) {
    return this.http.put<Item>(`${API}/items/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${API}/items/${id}`);
  }
}
