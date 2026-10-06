import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TPipe } from '../shared/t.pipe';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

/** Builds a mailto: URL — kept pure so it can be unit-tested. */
export function buildMailto(to: string, msg: ContactMessage): string {
  const subject = `Portfolio contact from ${msg.name}`;
  const body = `${msg.message}\n\n— ${msg.name} <${msg.email}>`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, TPipe],
  template: `
    <form class="contact-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
      <label class="field">
        {{ 'form.name' | t }}
        <input type="text" formControlName="name" autocomplete="name" [class.invalid]="invalid('name')" />
      </label>
      <label class="field">
        {{ 'form.email' | t }}
        <input type="email" formControlName="email" autocomplete="email" [class.invalid]="invalid('email')" />
      </label>
      <label class="field">
        {{ 'form.message' | t }}
        <textarea rows="5" formControlName="message" [class.invalid]="invalid('message')"></textarea>
      </label>

      @if (showError()) {
        <div class="form-error" role="alert">{{ 'form.err' | t }}</div>
      }
      @if (sent()) {
        <div class="form-sent" role="status">{{ 'form.sent' | t }}</div>
      }
      <button type="submit" class="btn primary">{{ 'form.send' | t }}</button>
    </form>
  `,
})
export class ContactForm {
  readonly to = input.required<string>();

  private readonly fb = inject(FormBuilder).nonNullable;

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  protected readonly showError = signal(false);
  protected readonly sent = signal(false);

  protected invalid(name: keyof ContactMessage): boolean {
    const c = this.form.controls[name];
    return c.invalid && c.touched;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.showError.set(true);
      this.sent.set(false);
      return;
    }
    this.showError.set(false);
    window.location.href = buildMailto(this.to(), this.form.getRawValue());
    this.sent.set(true);
  }
}
