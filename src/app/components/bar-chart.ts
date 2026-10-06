import { Component, ElementRef, OnDestroy, afterNextRender, computed, inject, input, signal } from '@angular/core';
import { ModuleCommits } from '../core/models';
import { prefersReducedMotion } from '../core/motion';

/** Horizontal bars that grow from 0 when the chart is 30% visible (60ms stagger per row). */
@Component({
  selector: 'app-bar-chart',
  template: `
    <div class="bar-chart" role="list">
      @for (row of rows(); track row.name; let i = $index) {
        <div class="bar-row" role="listitem">
          <span class="bar-label">{{ row.name }}</span>
          <span class="bar-track">
            <span
              class="bar-fill"
              [style.width.%]="on() ? row.pct : 0"
              [style.transition-delay.ms]="i * 60"
            ></span>
          </span>
          <span class="bar-value mono">{{ row.commits }}</span>
        </div>
      }
    </div>
  `,
})
export class BarChart implements OnDestroy {
  readonly data = input.required<ModuleCommits[]>();

  private readonly host = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;
  protected readonly on = signal(false);

  protected readonly rows = computed(() => {
    const max = Math.max(1, ...this.data().map((d) => d.commits));
    return this.data().map((d) => ({ ...d, pct: (d.commits / max) * 100 }));
  });

  constructor() {
    afterNextRender(() => {
      if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
        this.on.set(true);
        return;
      }
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          this.observer?.disconnect();
          this.on.set(true);
        },
        { threshold: 0.3 },
      );
      this.observer.observe(this.host.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
