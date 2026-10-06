import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ContentService } from './content.service';
import { PortfolioContent, Project } from './models';

const project = (slug: string, featured: boolean): Project => ({
  slug,
  name: slug,
  tagline: '',
  stack: [],
  summary: '',
  bullets: [],
  private: false,
  featured,
  links: [],
});

const fixture = {
  projects: [project('a', true), project('b', false)],
  modules: [
    { name: 'Inventory', commits: 370 },
    { name: 'Sales', commits: 193 },
  ],
} as unknown as PortfolioContent;

describe('ContentService', () => {
  let service: ContentService;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ContentService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('is null until the content has loaded', () => {
    expect(service.content()).toBeNull();
  });

  it('loads content for the current language and derives featured projects', () => {
    TestBed.tick();
    http.match('i18n/en.json').forEach((r) => r.flush({}));
    http.expectOne('data/en.json').flush(fixture);

    expect(service.featuredProjects().map((p) => p.slug)).toEqual(['a']);
    expect(service.maxModuleCommits()).toBe(370);
    expect(service.project('b')?.slug).toBe('b');
    expect(service.project('zzz')).toBeUndefined();
  });

  it('stays null when the request fails', () => {
    TestBed.tick();
    http.match('i18n/en.json').forEach((r) => r.flush({}));
    http.expectOne('data/en.json').flush('boom', { status: 500, statusText: 'Server Error' });
    expect(service.content()).toBeNull();
  });
});
