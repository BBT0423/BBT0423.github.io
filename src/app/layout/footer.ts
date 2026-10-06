import { Component, inject } from '@angular/core';
import { ContentService } from '../core/content.service';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="site-footer">
      <div class="container footer-inner mono">
        <span>© {{ year }} {{ content.content()?.profile?.name }}</span>
        <a href="https://github.com/BBT0423" target="_blank" rel="noopener">github.com/BBT0423</a>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly content = inject(ContentService);
  protected readonly year = new Date().getFullYear();
}
