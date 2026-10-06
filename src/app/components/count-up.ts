import { Component, ElementRef, OnDestroy, afterNextRender, computed, inject, input, signal } from '@angular/core';
import { prefersReducedMotion } from '../core/motion';

/** Splits "2+ yrs" / "2,043" into prefix, number and suffix. Returns null when there is no number. */
export function parseStat(value: string): { prefix: string; target: number; suffix: string; grouped: boolean } | null {
  const m = /^([^\d]*)([\d,]+)(.*)$/.exec(value ?? '');
  if (!m) return null;
  return { prefix: m[1], target: parseInt(m[2].replace(/,/g, ''), 10), suffix: m[3], grouped: m[2].includes(',') };
}

/** Animates a stat value from 0 when it becomes 40% visible (ease-out cubic, 1.4s). */
@Component({
  selector: 'app-count-up',
  template: `{{ text() }}`,
})
export class CountUp implements OnDestroy {
  readonly value = input.required<string>();

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly parsed = computed(() => parseStat(this.value()));
  private readonly current = signal<number | null>(null);
  private observer?: IntersectionObserver;
  private raf = 0;

  protected readonly text = computed(() => {
    const p = this.parsed();
    if (!p) return this.value();
    const n = this.current() ?? p.target;
    return p.prefix + (p.grouped ? n.toLocaleString('en-US') : String(n)) + p.suffix;
  });

  constructor() {
    afterNextRender(() => {
      const p = this.parsed();
      if (!p || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return;
      this.current.set(0);
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          this.observer?.disconnect();
          const t0 = performance.now();
          const step = (now: number) => {
            const t = Math.min(1, (now - t0) / 1400);
            this.current.set(Math.round(p.target * (1 - Math.pow(1 - t, 3))));
            if (t < 1) this.raf = requestAnimationFrame(step);
          };
          this.raf = requestAnimationFrame(step);
        },
        { threshold: 0.4 },
      );
      this.observer.observe(this.host.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    cancelAnimationFrame(this.raf);
  }
}
