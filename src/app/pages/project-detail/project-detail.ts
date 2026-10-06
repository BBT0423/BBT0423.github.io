import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { coverFor, pad2 } from '../../core/motion';
import { TPipe } from '../../shared/t.pipe';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, TPipe, RevealDirective],
  templateUrl: './project-detail.html',
})
export class ProjectDetail {
  /** Bound from the `:slug` route param via withComponentInputBinding(). */
  readonly slug = input.required<string>();

  protected readonly content = inject(ContentService);
  protected readonly project = computed(() => this.content.project(this.slug()));
  protected readonly cover = computed(() => coverFor(this.content.projectIndex(this.slug())));
  protected readonly next = computed(() => this.content.nextProject(this.slug()));
  protected readonly pad2 = pad2;
}
