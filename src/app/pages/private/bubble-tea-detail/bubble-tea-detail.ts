import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { BubbleTeaService } from '../../../services/bubble-tea';

@Component({
  selector: 'app-bubble-tea-detail',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './bubble-tea-detail.html',
  styleUrl: './bubble-tea-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BubbleTeaDetail {
  private readonly bubbleTeaService = inject(BubbleTeaService);

  readonly id = input.required<string>();

  readonly bubbleTea = computed(() => this.bubbleTeaService.getById(Number(this.id())));
}
