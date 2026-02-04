import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ItemsService, Item } from '../../core/items.service';
import { AuthService } from '../../core/auth.service';
import { take } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-items-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './items-list.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ItemsListComponent implements OnInit {
  items: Item[] = [];
  error = '';
  user_name = '';
  role = 'user';

  constructor(
    private itemsService: ItemsService,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    try {
      const u = JSON.parse(localStorage.getItem('user') || 'null');
      this.user_name = u.name || '';
      this.role = u.role || 'user';
    } catch {
      this.user_name = 'User';
      this.role = 'user';
    }

    this.load();
  }

  load() {
    this.error = '';
    this.itemsService.list().pipe(take(1)).subscribe({
      next: (data) => {
        this.items = Array.isArray(data) ? data : [];
        this.cdr.detectChanges();
      },
      error: (e) => (this.error = e?.error?.message || 'Failed to load items'),
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  remove(id: number) {
    // if (!confirm('Delete this item?')) return;
    this.itemsService.delete(id).subscribe({
      next: () => this.load(),
      error: (e) => (this.error = e?.error?.message || 'Delete failed'),
    });
  }
}
