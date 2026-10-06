import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { I18nService } from './i18n.service';

describe('I18nService', () => {
  let service: I18nService;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(I18nService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('defaults to English and loads the English dictionary', () => {
    TestBed.tick();
    http.expectOne('i18n/en.json').flush({ 'nav.projects': 'Projects' });
    expect(service.lang()).toBe('en');
    expect(service.t('nav.projects')).toBe('Projects');
  });

  it('falls back to the key when a translation is missing', () => {
    TestBed.tick();
    http.expectOne('i18n/en.json').flush({});
    expect(service.t('missing.key')).toBe('missing.key');
  });

  it('switches to Thai, reloads the dictionary and persists the choice', () => {
    TestBed.tick();
    http.expectOne('i18n/en.json').flush({ 'nav.projects': 'Projects' });

    service.toggle();
    TestBed.tick();
    http.expectOne('i18n/th.json').flush({ 'nav.projects': 'โปรเจกต์' });

    expect(service.lang()).toBe('th');
    expect(service.t('nav.projects')).toBe('โปรเจกต์');
    expect(localStorage.getItem('portfolio.lang')).toBe('th');
    expect(document.documentElement.lang).toBe('th');
  });
});
