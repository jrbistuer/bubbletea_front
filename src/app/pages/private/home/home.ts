import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { BubbleTeaService } from '../../../services/bubble-tea';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly bubbleTeaService = inject(BubbleTeaService);
  private readonly router = inject(Router);
  readonly bubbleTeas = this.bubbleTeaService.bubbleTeas;

  editBubbleTea(id: number) {
    this.router.navigate(['/form-bubbleteas', id]);
  }

  async deleteBubbleTea(id: number) {
    await this.bubbleTeaService.delete(id);
  }
}
