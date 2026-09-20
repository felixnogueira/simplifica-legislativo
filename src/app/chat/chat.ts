import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Marked } from 'marked';
import { finalize } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageService } from 'ng-zorro-antd/message';

import { ApiService } from '../api.service';
import { ChatResponse, Fonte, HistoricoChat } from '../models';

interface Mensagem {
  papel: 'usuario' | 'assistente';
  texto: string;
  fontes?: Fonte[];
  aviso?: string;
  erro?: boolean;
}

const marked = new Marked();

function renderMarkdown(texto: string): string {
  const html = marked.parse(texto) as string;
  return html.replace(/<a /g, '<a target="_blank" rel="noopener" ');
}

@Component({
  selector: 'app-chat',
  imports: [
    FormsModule,
    NzButtonModule,
    NzDropdownModule,
    NzIconModule,
    NzInputModule,
    NzMenuModule,
    NzTooltipModule,
  ],
  templateUrl: './chat.html',
  styleUrl: './chat.less',
})
export class Chat {
  private readonly api = inject(ApiService);
  private readonly msg = inject(NzMessageService);
  private readonly historicoRef = viewChild<ElementRef<HTMLDivElement>>('historico');

  readonly mensagens = signal<Mensagem[]>([]);
  readonly carregando = signal(false);
  readonly copiado = signal<number | null>(null);

  readonly sugestoes = [
    'quais proposições sobre educação estão em análise?',
    'quais proposições recentes sobre saúde estão em análise?',
    'como funciona o processo legislativo de um projeto de lei?',
  ];

  pergunta = '';

  abrirFonte(f: Fonte): void {
    if (f.url) {
      window.open(f.url, '_blank', 'noopener');
    }
  }

  copiar(i: number, texto: string): void {
    navigator.clipboard?.writeText(texto).then(() => {
      this.copiado.set(i);
      setTimeout(() => this.copiado.set(null), 2000);
    });
  }

  onEnter(event: Event): void {
    const e = event as KeyboardEvent;
    if (!e.shiftKey) {
      event.preventDefault();
      this.enviar();
    }
  }

  enviar(): void {
    const texto = this.pergunta.trim();
    if (!texto || this.carregando()) {
      return;
    }
    const historico: HistoricoChat[] = this.mensagens()
      .filter((m) => !m.erro && m.texto)
      .slice(-8)
      .map((m) => ({ papel: m.papel, conteudo: m.texto }));
    this.mensagens.update((m) => [...m, { papel: 'usuario', texto }]);
    this.pergunta = '';
    this.carregando.set(true);
    this.rolarAbaixo();
    this.api
      .chat(texto, historico)
      .pipe(finalize(() => this.resultadoChegou()))
      .subscribe({
        next: (r: ChatResponse) =>
          this.mensagens.update((m) => [
            ...m,
            { papel: 'assistente', texto: r.resposta, fontes: r.fontes, aviso: r.aviso },
          ]),
        error: (e: { error?: { detalhe?: string } }) => {
          const detalhe = e?.error?.detalhe;
          this.msg.error(detalhe || 'erro ao consultar o assistente');
          this.mensagens.update((m) => [
            ...m,
            {
              papel: 'assistente',
              texto: `Desculpe, não consegui responder. Tente novamente em instantes.`,
              erro: true,
            },
          ]);
        },
      });
  }

  render(texto: string): string {
    return renderMarkdown(texto);
  }

  limparConversa(): void {
    this.mensagens.set([]);
    this.pergunta = '';
  }

  private rolarAbaixo(): void {
    setTimeout(() => {
      const el = this.historicoRef()?.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    });
  }

  private resultadoChegou(): void {
    this.carregando.set(false);
    this.rolarAbaixo();
  }
}