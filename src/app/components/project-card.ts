import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../core/models';
import { coverFor, pad2 } from '../core/motion';
import { TPipe } from '../shared/t.pipe';

const MAX_CHIPS = 4;

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, TPipe],
  template: `
    <a class="project-card" [routerLink]="['/projects', project().slug]">
      <div class="project-cover" [style.background]="cover()">
        <span class="cover-pill mono">{{ (project().private ? 'label.private' : 'label.personal') | t }}</span>
        <span class="cover-idx mono">{{ idx() }}</span>
      </div>
      <div class="project-body">
        <h3 class="project-name">{{ project().name }}</h3>
        <p class="project-tagline">{{ project().tagline }}</p>
        <div class="mini-chips">
          @for (s of chips(); track s) {
            <span class="mini-chip mono">{{ s }}</span>
          }
          @if (more() > 0) {
            <span class="mini-chip more mono">+{{ more() }}</span>
          }
        </div>
        <span class="view-link mono">{{ 'label.viewDetails' | t }} →</span>
      </div>
    </a>
  `,
})
export class ProjectCard {
  readonly project = input.required<Project>();
  readonly index = input(0);

  protected readonly cover = computed(() => coverFor(this.index()));
  protected readonly idx = computed(() => pad2(this.index() + 1));
  protected readonly chips = computed(() => this.project().stack.slice(0, MAX_CHIPS));
  protected readonly more = computed(() => this.project().stack.length - MAX_CHIPS);
}
