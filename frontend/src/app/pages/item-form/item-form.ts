import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ItemsService } from '../../core/items.service';

@Component({
  standalone: true,
  selector: 'app-item-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './item-form.html'
})
export class ItemFormComponent implements OnInit {
  error = '';
  isEdit = false;
  id: number | null = null;
  loading = false;

  form: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private itemsService: ItemsService
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      category: ['']
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);
      this.loading = true;

      this.itemsService.get(this.id).subscribe({
        next: (it: any) => {
          this.form.patchValue({
            title: it.title ?? it.name ?? '',
            description: it.description ?? '',
            category: it.category ?? ''
          });
          this.loading = false;
        },
        error: (e) => {
          this.error = e?.error?.message || 'Failed to load item';
          this.loading = false;
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/items']);
  }

  submit() {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.value as any;

    this.loading = true;

    if (this.isEdit && this.id != null) {
      this.itemsService.update(this.id, payload).subscribe({
        next: () => this.router.navigate(['/items']),
        error: (e) => {
          this.error = e?.error?.message || 'Update failed';
          this.loading = false;
        }
      });
    } else {
      this.itemsService.create(payload).subscribe({
        next: () => this.router.navigate(['/items']),
        error: (e) => {
          this.error = e?.error?.message || 'Create failed';
          this.loading = false;
        }
      });
    }
  }
}
