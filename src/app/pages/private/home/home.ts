import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  readonly bubbleTeas = this.bubbleTeaService.bubbleTeas;
}
