import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { TPipe } from '../../shared/t.pipe';
import { RevealDirective } from '../../shared/reveal.directive';
import { StatCard } from '../../components/stat-card';
import { Timeline } from '../../components/timeline';
import { BarChart } from '../../components/bar-chart';
import { SkillGroup } from '../../components/skill-group';
import { ProjectCard } from '../../components/project-card';
import { HeroBg } from '../../components/hero-bg';
import { Typer } from '../../components/typer';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    TPipe,
    RevealDirective,
    StatCard,
    Timeline,
    BarChart,
    SkillGroup,
    ProjectCard,
    HeroBg,
    Typer,
  ],
  templateUrl: './home.html',
})
export class Home {
  protected readonly content = inject(ContentService);
  protected readonly typeWords = ['.NET / Vue', 'Vue 3 + TypeScript', '.NET 8 Web API', 'Angular', 'Ionic + Capacitor'];

  protected tel(phone: string): string {
    return 'tel:' + phone.replace(/[^\d+]/g, '');
  }
}
