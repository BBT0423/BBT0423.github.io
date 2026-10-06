import { DOCUMENT, Injectable, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap } from 'rxjs';
import { Lang } from './models';

const STORAGE_KEY = 'portfolio.lang';

function readStoredLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'th' ? 'th' : 'en';
  } catch {
    return 'en';
  }
}

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);

  readonly lang = signal<Lang>(readStoredLang());

  private readonly dict = toSignal(
    toObservable(this.lang).pipe(
      switchMap((lang) =>
        this.http
          .get<Record<string, string>>(`i18n/${lang}.json`)
          .pipe(catchError(() => of({} as Record<string, string>))),
      ),
    ),
    { initialValue: {} as Record<string, string> },
  );

  constructor() {
    effect(() => {
      const lang = this.lang();
      this.document.documentElement.lang = lang;
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        // storage unavailable (private mode) — language just won't persist
      }
    });
  }

  /** Returns the translation for `key`, or the key itself while loading / when missing. */
  t(key: string): string {
    return this.dict()[key] ?? key;
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
  }

  toggle(): void {
    this.lang.update((l) => (l === 'en' ? 'th' : 'en'));
  }
}
