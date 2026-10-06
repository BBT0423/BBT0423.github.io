import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../core/i18n.service';
import { ThemeService } from '../core/theme.service';
import { TPipe } from '../shared/t.pipe';

@Component({
  selector: 'app-header',
  imports: [RouterLink, TPipe],
  template: `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" routerLink="/" fragment="top">
          <span class="brand-mark mono">PN</span>
          <span class="brand-name">Pongpan</span>
        </a>

        <nav class="nav" aria-label="Main">
          @for (item of navItems; track item) {
            <a routerLink="/" [fragment]="item">{{ 'nav.' + item | t }}</a>
          }
        </nav>

        <div class="header-actions">
          <div class="lang-toggle" role="group" aria-label="Language">
            <span class="lang-pill" [class.th]="i18n.lang() === 'th'" aria-hidden="true"></span>
            <button type="button" class="mono" [class.active]="i18n.lang() === 'en'" (click)="i18n.setLang('en')">EN</button>
            <button type="button" class="mono" [class.active]="i18n.lang() === 'th'" (click)="i18n.setLang('th')">TH</button>
          </div>
          <button
            type="button"
            class="theme-toggle"
            [class.dark]="theme.theme() === 'dark'"
            (click)="theme.toggle()"
            [attr.aria-label]="'a11y.theme' | t"
          >
            <svg class="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>
            </svg>
            <svg class="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  `,
})
export class Header {
  protected readonly i18n = inject(I18nService);
  protected readonly theme = inject(ThemeService);
  protected readonly navItems = ['experience', 'growth', 'skills', 'projects', 'contact'];
}
