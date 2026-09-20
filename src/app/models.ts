export interface Documento {
  titulo: string;
  tipo: string;
  subtipo: string;
  numero: string;
  ano: number;
  data: string;
  situacao: string;
  autores: string;
  protocolo: string;
  url: string;
  ementa?: string;
  score?: number;
}

export interface Filtros {
  anos: number[];
  tipos: string[];
  situacoes: string[];
  autores: string[];
}

export interface Fonte {
  titulo: string;
  url: string;
  tipo: string;
  data: string;
  ano: number;
  score: number;
}

export interface ChatResponse {
  resposta: string;
  fontes: Fonte[];
  aviso?: string;
}

export interface HistoricoChat {
  papel: 'usuario' | 'assistente';
  conteudo: string;
}
