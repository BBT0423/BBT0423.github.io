import { Injectable, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap } from 'rxjs';
import { I18nService } from './i18n.service';
import { PortfolioContent, Project } from './models';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient);
  private readonly i18n = inject(I18nService);

  /** Content for the current language; `null` until the first load finishes. */
  readonly content = toSignal(
    toObservable(this.i18n.lang).pipe(
      switchMap((lang) =>
        this.http
          .get<PortfolioContent>(`data/${lang}.json`)
          .pipe(catchError(() => of(null))),
      ),
    ),
    { initialValue: null },
  );

  readonly featuredProjects = computed(
    () => this.content()?.projects.filter((p) => p.featured) ?? [],
  );

  /** Position of a project in the list — drives its cover gradient and "01" index. */
  projectIndex(slug: string): number {
    return Math.max(0, this.content()?.projects.findIndex((p) => p.slug === slug) ?? 0);
  }

  nextProject(slug: string): Project | undefined {
    const projects = this.content()?.projects ?? [];
    if (!projects.length) return undefined;
    return projects[(this.projectIndex(slug) + 1) % projects.length];
  }

  readonly maxModuleCommits = computed(() =>
    Math.max(1, ...(this.content()?.modules.map((m) => m.commits) ?? [])),
  );

  project(slug: string): Project | undefined {
    return this.content()?.projects.find((p) => p.slug === slug);
  }
}
