import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'chat' },
  {
    path: 'chat',
    loadComponent: () => import('./chat/chat').then((m) => m.Chat),
    title: 'Chat',
  },
  {
    path: 'sobre',
    loadComponent: () => import('./sobre/sobre').then((m) => m.Sobre),
    title: 'Sobre',
  },
  { path: '**', redirectTo: 'chat' },
];