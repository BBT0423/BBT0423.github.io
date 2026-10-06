import { Component, computed, input } from '@angular/core';
import { SkillGroup as SkillGroupModel } from '../core/models';
import { pad2 } from '../core/motion';

@Component({
  selector: 'app-skill-group',
  template: `
    <div class="card lift skill-group">
      <div class="row-between">
        <h3 class="card-title">{{ group().group }}</h3>
        <span class="mono muted small">{{ count() }}</span>
      </div>
      <ul class="chips">
        @for (item of group().items; track item) {
          <li class="chip">{{ item }}</li>
        }
      </ul>
    </div>
  `,
})
export class SkillGroup {
  readonly group = input.required<SkillGroupModel>();
  protected readonly count = computed(() => pad2(this.group().items.length));
}
