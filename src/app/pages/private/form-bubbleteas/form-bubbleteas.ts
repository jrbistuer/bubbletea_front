import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BubbleTeaService } from '../../../services/bubble-tea';

@Component({
  selector: 'app-form-bubbleteas',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './form-bubbleteas.html',
  styleUrl: './form-bubbleteas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBubbleteas {
  private readonly bubbleTeaService = inject(BubbleTeaService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly id = input<string>();
  readonly isEdit = computed(() => !!this.id());
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    temperature: ['cold', Validators.required],
    precio: [0, [Validators.required, Validators.min(0)]],
    active: [true],
  });

  constructor() {
    effect(() => {
      const id = this.id();
      this.bubbleTeaService.bubbleTeas(); // track signal so effect re-runs when data loads
      if (id) {
        const bt = this.bubbleTeaService.getById(Number(id));
        if (bt) {
          this.form.setValue({
            name: bt.name,
            temperature: String(bt.temperature),
            precio: bt.precio,
            active: bt.active,
          });
        }
      }
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;
    this.saving.set(true);
    this.error.set(null);
    const value = this.form.getRawValue();
    try {
      if (this.isEdit()) {
        await this.bubbleTeaService.update(Number(this.id()), value);
      } else {
        await this.bubbleTeaService.add(value);
      }
      this.router.navigate(['/home']);
    } catch (e: unknown) {
      this.error.set(e instanceof Error ? e.message : 'An error occurred');
    } finally {
      this.saving.set(false);
    }
  }
}
