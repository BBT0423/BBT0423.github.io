import { Component } from '@angular/core';

/** Masked grid + three slowly drifting blobs. Motion is pure CSS (transform only) and stops under reduced motion. */
@Component({
  selector: 'app-hero-bg',
  template: `
    <div class="hero-bg" aria-hidden="true">
      <div class="hero-grid"></div>
      <div class="blob blob-a"></div>
      <div class="blob blob-b"></div>
      <div class="blob blob-c"></div>
    </div>
  `,
})
export class HeroBg {}
