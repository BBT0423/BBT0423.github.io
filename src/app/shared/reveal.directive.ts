import { Directive, ElementRef, OnDestroy, afterNextRender, inject } from '@angular/core';
import { prefersReducedMotion } from '../core/motion';

/**
 * Fades an element up into view the first time it scrolls into the viewport.
 * Siblings are staggered by 80ms × (index mod 4). Elements already visible on load are left alone.
 */
@Directive({ selector: '[appReveal]' })
export class RevealDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => this.setup());
  }

  private setup(): void {
    const el = this.el.nativeElement as HTMLElement;
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return;
    if (el.getBoundingClientRect().top < innerHeight * 0.92) return;

    const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
    const delay = (Math.max(0, siblings.indexOf(el)) % 4) * 80;

    el.style.opacity = '0';
    el.style.transform = 'translateY(26px)';
    el.style.transition = 'opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1)';
    el.style.transitionDelay = `${delay}ms`;

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        this.observer?.disconnect();
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        // Hand control back to the stylesheet (hover transforms etc.) once the reveal finishes.
        setTimeout(() => {
          el.style.removeProperty('transition');
          el.style.removeProperty('transition-delay');
          el.style.removeProperty('opacity');
          el.style.removeProperty('transform');
        }, 1100);
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
