import { Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';

import { ApiService } from '../api.service';

interface HealthStatus {
  status: string;
  timestamp?: string;
}

@Component({
  selector: 'app-sobre',
  imports: [NgIf, NzCardModule, NzSpinModule, NzAlertModule],
  templateUrl: './sobre.html',
  styleUrl: './sobre.less',
})
export class Sobre {
  private readonly api = inject(ApiService);

  readonly healthStatus = signal<HealthStatus | null>(null);
  readonly carregandoHealth = signal(false);
  readonly erroHealth = signal('');

  constructor() {
    this.carregarHealth();
  }

  carregarHealth(): void {
    this.carregandoHealth.set(true);
    this.erroHealth.set('');
    this.api.health().subscribe({
      next: (status) => {
        this.healthStatus.set(status);
        this.carregandoHealth.set(false);
      },
      error: () => {
        this.erroHealth.set('Não foi possível conectar ao backend');
        this.carregandoHealth.set(false);
      },
    });
  }
}
