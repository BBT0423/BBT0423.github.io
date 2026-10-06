import { Component, input } from '@angular/core';
import { TimelineEntry } from '../core/models';

@Component({
  selector: 'app-timeline',
  template: `
    <ol class="timeline">
      @for (entry of entries(); track entry.date; let last = $last) {
        <li class="timeline-item">
          <span class="timeline-dot" [class.last]="last" aria-hidden="true"></span>
          <div class="timeline-date mono">{{ entry.date }}</div>
          <div class="timeline-text">{{ entry.text }}</div>
        </li>
      }
    </ol>
  `,
})
export class Timeline {
  readonly entries = input.required<TimelineEntry[]>();
}
