import { Component, input } from '@angular/core';
import { Stat } from '../core/models';
import { CountUp } from './count-up';

@Component({
  selector: 'app-stat-card',
  imports: [CountUp],
  template: `
    <div class="card lift stat-card">
      <div class="stat-value mono"><app-count-up [value]="stat().value" /></div>
      <div class="stat-label">{{ stat().label }}</div>
      @if (stat().sub) {
        <div class="stat-sub mono">{{ stat().sub }}</div>
      }
    </div>
  `,
})
export class StatCard {
  readonly stat = input.required<Stat>();
}
