import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ContactForm, buildMailto } from './contact-form';

describe('ContactForm', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactForm],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  function create() {
    const fixture = TestBed.createComponent(ContactForm);
    fixture.componentRef.setInput('to', 'me@example.com');
    return fixture.componentInstance;
  }

  it('starts invalid', () => {
    expect(create().form.valid).toBe(false);
  });

  it('rejects a bad email and a too-short message', () => {
    const form = create().form;
    form.setValue({ name: 'Boat', email: 'not-an-email', message: 'short' });
    expect(form.controls.email.hasError('email')).toBe(true);
    expect(form.controls.message.hasError('minlength')).toBe(true);
  });

  it('is valid with proper values', () => {
    const form = create().form;
    form.setValue({ name: 'Boat', email: 'boat@example.com', message: 'Hello, I would like to talk.' });
    expect(form.valid).toBe(true);
  });

  it('marks all fields touched when submitting an invalid form', () => {
    const cmp = create();
    cmp.submit();
    expect(cmp.form.controls.name.touched).toBe(true);
    expect(cmp.form.controls.email.touched).toBe(true);
  });
});

describe('buildMailto', () => {
  it('encodes subject and body', () => {
    const url = buildMailto('me@example.com', { name: 'A B', email: 'a@b.co', message: 'Hi & bye' });
    expect(url.startsWith('mailto:me@example.com?subject=')).toBe(true);
    expect(url).toContain(encodeURIComponent('Portfolio contact from A B'));
    expect(url).toContain(encodeURIComponent('Hi & bye'));
  });
});
