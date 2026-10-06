import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header';
import { Footer } from './layout/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <app-header />
    <main id="top">
      <router-outlet />
    </main>
    <app-footer />
  `,
})
export class App {
  constructor() {
    // Keep anchored sections clear of the 64px sticky header.
    inject(ViewportScroller).setOffset([0, 64]);
  }
}
