import { Component, DestroyRef, afterNextRender, computed, inject, input, signal } from '@angular/core';
import { prefersReducedMotion } from '../core/motion';

/** Types each word (75ms/char), holds 1.8s, deletes (35ms/char), pauses 350ms, then moves on. */
@Component({
  selector: 'app-typer',
  template: `{{ shown() }}<span class="caret" [class.static]="!animating()" aria-hidden="true"></span>`,
})
export class Typer {
  readonly words = input.required<string[]>();

  private readonly index = signal(0);
  private readonly length = signal<number | null>(null);
  private deleting = false;
  private timer?: ReturnType<typeof setTimeout>;
  protected readonly animating = signal(false);

  protected readonly shown = computed(() => {
    const words = this.words();
    const word = words[this.index() % words.length] ?? '';
    const n = this.length();
    return n == null ? word : word.slice(0, n);
  });

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
    afterNextRender(() => {
      if (prefersReducedMotion()) return;
      this.animating.set(true);
      this.length.set(0);
      this.tick();
    });
  }

  private tick(): void {
    const words = this.words();
    const word = words[this.index() % words.length] ?? '';
    const n = this.length() ?? 0;
    let delay: number;

    if (!this.deleting) {
      if (n < word.length) {
        this.length.set(n + 1);
        delay = 75;
      } else {
        this.deleting = true;
        delay = 1800;
      }
    } else if (n > 0) {
      this.length.set(n - 1);
      delay = 35;
    } else {
      this.deleting = false;
      this.index.update((i) => i + 1);
      delay = 350;
    }
    this.timer = setTimeout(() => this.tick(), delay);
  }
}
